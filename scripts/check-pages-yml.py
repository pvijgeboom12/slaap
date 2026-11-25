#!/usr/bin/env python3
"""Controleert of .pages.yml alle velden van de content-bestanden dekt.
Pages CMS bewaart alleen velden die in .pages.yml staan; een ontbrekend veld
verdwijnt dus bij de eerste opslag in het CMS. Gebruik: python3 scripts/check-pages-yml.py"""
import sys, yaml, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
cfg = yaml.safe_load((root / '.pages.yml').read_text())
fouten = []
def check(data, fields, pad):
    namen = {f['name']: f for f in fields}
    if not isinstance(data, dict):
        return
    for k, v in data.items():
        if k not in namen:
            fouten.append(f'{pad}.{k} ontbreekt in .pages.yml'); continue
        f = namen[k]
        if f.get('type') == 'object':
            items = v if f.get('list') else [v]
            if f.get('list') and not isinstance(v, list):
                fouten.append(f'{pad}.{k} is geen lijst'); continue
            for i, x in enumerate(items or []):
                check(x, f['fields'], f'{pad}.{k}' + (f'[{i}]' if f.get('list') else ''))
        elif isinstance(v, list) and not f.get('list'):
            fouten.append(f'{pad}.{k} is een lijst, maar het veld niet')
        elif isinstance(v, dict):
            fouten.append(f'{pad}.{k} is een object, maar het veld niet')
for e in cfg['content']:
    if e.get('type') != 'file':
        continue
    data = yaml.safe_load((root / e['path']).read_text())
    check(data, e['fields'], e['path'])
print('\n'.join(fouten) or f"OK: {len(cfg['content'])} onderdelen, alle velden gedekt")
sys.exit(1 if fouten else 0)
