import sys, yaml, os
root = sys.argv[1]
L = {  # labels
 'seo':'Zoekmachines (Google)','titel':'Titel','omschrijving':'Omschrijving','hero':'Bovenste blok (beeld)','kicker':'Regel boven de titel',
 'lead':'Intro','tekst':'Tekst','tekst1':'Tekst alinea 1','tekst2':'Tekst alinea 2','knop':'Knoptekst','link':'Linktekst','punten':'Punten','alt':'Beschrijving foto’s (alt-tekst)',
 'ankers':'Snelkoppelingen (knoppen in beeld)','status':'Tekst per status','binnenkort':'Status binnenkort','open':'Status open','gesloten':'Status gesloten',
 'blokken':'Blokken','acties':'Acties','over':'Over het congres','voor_wie':'Voor wie','beeld':'Fotoblok','meedoen':'Doe mee','comite':'Comité','sponsors':'Sponsors',
 'afsluiter':'Afsluitend blok','overzicht':'Programma-overzicht','sprekers':'Sprekers','posters':'Posters','diner':'Congresdiner','tarieven':'Tarieven','rijen':'Tariefregels',
 'categorie':'Categorie','vroegboek':'Vroegboektarief (€)','regulier':'Regulier tarief (€)','voetnoot':'Voetnoot','groep':'Groepsregistratie','voorwaarden':'Voorwaarden',
 'lid_worden':'Lid worden','nswo':'NSWO','svnl':'SVNL','naam':'Naam','deadlines':'Deadlines (labels)','richtlijnen':'Richtlijnen','opbouw':'Opbouw abstract','onderdelen':'Onderdelen',
 'data_blitz':'Data Blitz','feiten':'Feiten','waarde':'Waarde','label':'Label','prijzen':'Posterprijzen','locatie':'Locatie','hotel':'Hotel','route':'Route','accreditatie':'Accreditatie',
 'niveaus':'Koppen sponsorniveaus','sponsor_worden':'Sponsor worden','cgr':'CGR-gedragscode','formulier':'Contactformulier','zijbalk':'Zijbalk','snel':'Snelle links',
 'bijschrift':'Bijschrift (voor schermlezers)','foto_alt':'Beschrijving foto (alt-tekst)','foto_bijschrift':'Bijschrift foto','kaart':'Tekst in kaartvak','email':'E-mailadres','telefoon':'Telefoon','website':'Website (URL)',
}
HELP = 'Tekst tussen [haken] wordt een gele open plek. Codes zoals {deadline_abstracts} vullen een datum uit Instellingen congres in.'
def lab(k): return L.get(k, k.replace('_',' ').capitalize())
def field(k, v):
    f = {'name': k, 'label': lab(k)}
    if isinstance(v, dict):
        f['type'] = 'object'; f['fields'] = [field(kk, vv) for kk, vv in v.items()]
    elif isinstance(v, list):
        if v and isinstance(v[0], dict):
            f['type'] = 'object'; f['list'] = True; f['fields'] = [field(kk, vv) for kk, vv in v[0].items()]
        else:
            f['type'] = 'string'; f['list'] = True
    else:
        long = isinstance(v, str) and len(v) > 90
        f['type'] = 'text' if long else 'string'
        if isinstance(v, str) and ('{' in v or '[' in v): f['description'] = HELP
    if k == 'omschrijving': f['description'] = 'Zichtbaar in Google onder de titel. Houd het tussen 120 en 160 tekens.'; f['type']='text'
    return f
names = {'home':'Home','programma':'Programma','registratie':'Registratie','abstracts':'Abstracts & posters','praktisch':'Praktisch','sponsors':'Sponsors','contact':'Contact'}
out = []
for lang in ['nl','en']:
    for p, n in names.items():
        data = yaml.safe_load(open(f'{root}/src/content/pages/{lang}/{p}.yml'))
        out.append({'name': f'tekst-{p}-{lang}', 'label': f'Tekst {n} ({lang.upper()})', 'type': 'file', 'path': f'src/content/pages/{lang}/{p}.yml', 'format': 'yaml',
                    'fields': [field(k, v) for k, v in data.items()]})
print(yaml.safe_dump(out, allow_unicode=True, sort_keys=False, width=200))
