import './set-public-path';

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import App, { Conference } from './components/app/App';

/*

Use this when embedding into avenger:

irs = Conference.where('created_at > ?', 1.years.ago).order("created_at DESC").flat_map(&:internal_releases).filter {|ir| ir.variant == 'staff'}

its = irs.flat_map(&:internal_tickets)


def reducer(mapping, ticket)
email = ticket.email
bookingRef = ticket.booking_ref
firstName = ticket.person.first_name
lastName = ticket.person.last_name
obj = {
email: email,
bookingRef: bookingRef,
firstName: firstName,
lastName: lastName
}
if mapping.key?(email)
if mapping[email][:bookingRef] != bookingRef
puts "for #{email} #{mapping[email][:bookingRef]} != #{bookingRef}"
end
else
mapping[email] = obj
end
mapping
end

mapping = {}
mapping = its.reduce(mapping) { |a,b| reducer(a,b)}
puts "-----"
puts mapping.to_json

 */

const staffList = {
  'aaron.campbell@websummit.com': {
    bookingRef: 'QSWY-STF',
    email: 'aaron.campbell@websummit.com',
    firstName: 'Aaron',
    lastName: 'Campbell',
  },
  'aaron.meagher@websummit.com': {
    bookingRef: 'SZAP-STF',
    email: 'aaron.meagher@websummit.com',
    firstName: 'Aaron',
    lastName: 'Meagher',
  },
  'abbey.adkins@websummit.com': {
    bookingRef: 'PWMK-STF',
    email: 'abbey.adkins@websummit.com',
    firstName: 'Abbey',
    lastName: 'Adkins',
  },
  'adam.connon@websummit.com': {
    bookingRef: 'M6PW-STF',
    email: 'adam.connon@websummit.com',
    firstName: 'Adam',
    lastName: 'Connon',
  },
  'adam.fleming@websummit.com': {
    bookingRef: '8BCC-STF',
    email: 'adam.fleming@websummit.com',
    firstName: 'Adam',
    lastName: 'Fleming',
  },
  'ahmed.elbanna@websummit.com': {
    bookingRef: '5WSV-STF',
    email: 'ahmed.elbanna@websummit.com',
    firstName: 'Ahmed',
    lastName: 'El-Banna',
  },
  'aine.kavanagh@websummit.com': {
    bookingRef: 'MWBD-STF',
    email: 'aine.kavanagh@websummit.com',
    firstName: 'Aine',
    lastName: 'Kavanagh',
  },
  'aine.madden@websummit.com': {
    bookingRef: 'K9WA-STF',
    email: 'aine.madden@websummit.com',
    firstName: 'Áine',
    lastName: 'Madden',
  },
  'aisling.flynn@websummit.com': {
    bookingRef: 'Y06S-STF',
    email: 'aisling.flynn@websummit.com',
    firstName: 'Aisling',
    lastName: 'Flynn',
  },
  'alex.anikeev@websummit.com': {
    bookingRef: '0ORY-STF',
    email: 'alex.anikeev@websummit.com',
    firstName: 'Alexander',
    lastName: 'Anikeev',
  },
  'alex.mackenzie@websummit.com': {
    bookingRef: 'CCWK-STF',
    email: 'alex.mackenzie@websummit.com',
    firstName: 'Alex',
    lastName: 'Mackenzie',
  },
  'alexandra.silva@websummit.com': {
    bookingRef: 'YI98-STF',
    email: 'alexandra.silva@websummit.com',
    firstName: 'Alexandra',
    lastName: 'Silva',
  },
  'alice.mcdermott@websummit.com': {
    bookingRef: 'JA8F-STF',
    email: 'alice.mcdermott@websummit.com',
    firstName: 'Alice',
    lastName: 'McDermott',
  },
  'allison@cilabs.com': {
    bookingRef: 'SBN4-STF',
    email: 'allison@cilabs.com',
    firstName: 'Allisson',
    lastName: 'Reilly',
  },
  'allison@websummit.com': {
    bookingRef: 'DMES-STF',
    email: 'allison@websummit.com',
    firstName: 'Allison',
    lastName: 'Reilly',
  },
  'allyson.doyle@websummit.com': {
    bookingRef: 'YDBP-STF',
    email: 'allyson.doyle@websummit.com',
    firstName: 'Ally',
    lastName: 'Doyle',
  },
  'amanda.egan@websummit.com': {
    bookingRef: 'A0YB-STF',
    email: 'amanda.egan@websummit.com',
    firstName: 'Amanda',
    lastName: 'Egan',
  },
  'angelika.kosiorek+1@netguru.com': {
    bookingRef: '96CF-STF',
    email: 'angelika.kosiorek+1@netguru.com',
    firstName: 'Angelika',
    lastName: 'Kosiorek',
  },
  'angelika.kosiorek+2@netguru.com': {
    bookingRef: 'GL0X-STF',
    email: 'angelika.kosiorek+2@netguru.com',
    firstName: 'Maria',
    lastName: 'Kos (test conf - STAFF)',
  },
  'angelika.kosiorek+4@netguru.com': {
    bookingRef: 'DSQ3-STF',
    email: 'angelika.kosiorek+4@netguru.com',
    firstName: 'Marta',
    lastName: 'Gras (test conf - STAFF)',
  },
  'anna@websummit.com': {
    bookingRef: 'SFLD-STF',
    email: 'anna@websummit.com',
    firstName: 'Anna',
    lastName: "O'Hare",
  },
  'anne@websummit.com': {
    bookingRef: 'HECV-STF',
    email: 'anne@websummit.com',
    firstName: 'Anne',
    lastName: "O'Leary",
  },
  'antonio.nevescosta@websummit.com': {
    bookingRef: 'UMO1-STF',
    email: 'antonio.nevescosta@websummit.com',
    firstName: 'Antonio',
    lastName: 'Neves Costa',
  },
  'aoife.brew@websummit.com': {
    bookingRef: '5XZI-STF',
    email: 'aoife.brew@websummit.com',
    firstName: 'Aoife',
    lastName: 'Brew',
  },
  'aoife.buckley@websummit.com': {
    bookingRef: '6TLM-STF',
    email: 'aoife.buckley@websummit.com',
    firstName: 'Aoife',
    lastName: 'Buckley',
  },
  'aoileann@websummit.com': {
    bookingRef: 'QPEG-STF',
    email: 'aoileann@websummit.com',
    firstName: 'Aoileann',
    lastName: 'Ni Chuilleanáin',
  },
  'arianne.cruz@websummit.com': {
    bookingRef: 'M58M-STF',
    email: 'arianne.cruz@websummit.com',
    firstName: 'Arianne',
    lastName: 'Cruz',
  },
  'artem.ankudovich@websummit.com': {
    bookingRef: 'CPLO-STF',
    email: 'artem.ankudovich@websummit.com',
    firstName: 'Artem',
    lastName: 'Ankudovich',
  },
  'artur.pereira@websummit.com': {
    bookingRef: 'J6ZJ-STF',
    email: 'artur.pereira@websummit.com',
    firstName: 'Artur',
    lastName: 'Pereira',
  },
  'ary.blue@websummit.com': {
    bookingRef: 'DP70-STF',
    email: 'ary.blue@websummit.com',
    firstName: 'Ary',
    lastName: 'Blue',
  },
  'barry@websummit.com': {
    bookingRef: 'EVEP-STF',
    email: 'barry@websummit.com',
    firstName: 'Barry',
    lastName: 'McCullagh',
  },
  'bernardo.jose@websummit.com': {
    bookingRef: 'MQQN-STF',
    email: 'bernardo.jose@websummit.com',
    firstName: 'Bernardo',
    lastName: 'Jose',
  },
  'beth.dinsmore@websummit.com': {
    bookingRef: 'M556-STF',
    email: 'beth.dinsmore@websummit.com',
    firstName: 'Elizabeth',
    lastName: 'Dinsmore',
  },
  'brian.curran@websummit.com': {
    bookingRef: 'JQDH-STF',
    email: 'brian.curran@websummit.com',
    firstName: 'Brian',
    lastName: 'Curran',
  },
  'brian.flanagan@websummit.com': {
    bookingRef: '3AV7-STF',
    email: 'brian.flanagan@websummit.com',
    firstName: 'brian',
    lastName: 'flanagan',
  },
  'brian.tobin@websummit.com': {
    bookingRef: 'F0FI-STF',
    email: 'brian.tobin@websummit.com',
    firstName: 'Brian',
    lastName: 'Tobin',
  },
  'campbell.lee@websummit.com': {
    bookingRef: 'YTUM-STF',
    email: 'campbell.lee@websummit.com',
    firstName: 'Lee',
    lastName: 'Campbell',
  },
  'caoimhe.hurley@websummit.com': {
    bookingRef: 'DHNY-STF',
    email: 'caoimhe.hurley@websummit.com',
    firstName: 'Caoimhe',
    lastName: 'Hurley',
  },
  'carmel@websummit.com': {
    bookingRef: 'FCNO-STF',
    email: 'carmel@websummit.com',
    firstName: 'Carmel',
    lastName: 'Lee',
  },
  'carol.lin@websummit.com': {
    bookingRef: '840L-STF',
    email: 'carol.lin@websummit.com',
    firstName: 'Carol (Yijing)',
    lastName: 'Lin',
  },
  'carolyn.quinlan@websummit.com': {
    bookingRef: 'TKIJ-STF',
    email: 'carolyn.quinlan@websummit.com',
    firstName: 'Carolyn',
    lastName: 'Quinlan',
  },
  'casey@riseconf.com': {
    bookingRef: 'J5UP-STF',
    email: 'casey@riseconf.com',
    firstName: 'Casey',
    lastName: 'Lau',
  },
  'cathal.curry@websummit.com': {
    bookingRef: 'YLT2-STF',
    email: 'cathal.curry@websummit.com',
    firstName: 'Cathal',
    lastName: 'Curry',
  },
  'cathal.walsh@websummit.com': {
    bookingRef: 'UMOM-STF',
    email: 'cathal.walsh@websummit.com',
    firstName: 'Cathal',
    lastName: 'Walsh',
  },
  'charlie.mullen@websummit.com': {
    bookingRef: 'MLGZ-STF',
    email: 'charlie.mullen@websummit.com',
    firstName: 'Charlie',
    lastName: 'Mullen',
  },
  'chloe.hines@websummit.com': {
    bookingRef: 'ZNPH-STF',
    email: 'chloe.hines@websummit.com',
    firstName: 'Chloe',
    lastName: 'Hines',
  },
  'chris@websummit.com': {
    bookingRef: 'L8PN-STF',
    email: 'chris@websummit.com',
    firstName: 'Chris',
    lastName: 'Murphy',
  },
  'ciara.murnane@websummit.com': {
    bookingRef: 'KUVA-STF',
    email: 'ciara.murnane@websummit.com',
    firstName: 'Ciara',
    lastName: 'Murnane',
  },
  'ciara.ohanrahan@websummit.com': {
    bookingRef: 'EASC-STF',
    email: 'ciara.ohanrahan@websummit.com',
    firstName: 'Ciara',
    lastName: "O'Hanrahan",
  },
  'ciaran.bruder@websummit.com': {
    bookingRef: 'IWL8-STF',
    email: 'ciaran.bruder@websummit.com',
    firstName: 'Ciaran',
    lastName: 'Bruder',
  },
  'ciaran.curley@websummit.com': {
    bookingRef: 'WVJU-STF',
    email: 'ciaran.curley@websummit.com',
    firstName: 'Ciarán',
    lastName: 'Curley',
  },
  'ciaran.hope@websummit.com': {
    bookingRef: 'AHFH-STF',
    email: 'ciaran.hope@websummit.com',
    firstName: 'Ciaran',
    lastName: 'Hope',
  },
  'claire.davis@websummit.com': {
    bookingRef: 'VZL9-STF',
    email: 'claire.davis@websummit.com',
    firstName: 'Claire',
    lastName: 'Davis',
  },
  'clarissa.schirosi@websummit.com': {
    bookingRef: 'Q44G-STF',
    email: 'clarissa.schirosi@websummit.com',
    firstName: 'Clarissa',
    lastName: 'Schirosi',
  },
  'clementine.baig@websummit.com': {
    bookingRef: 'HT9P-STF',
    email: 'clementine.baig@websummit.com',
    firstName: 'Clementine',
    lastName: 'Baig',
  },
  'colin@websummit.com': {
    bookingRef: 'V5EX-STF',
    email: 'colin@websummit.com',
    firstName: 'Colin',
    lastName: 'McAvoy',
  },
  'colm.moore@websummit.com': {
    bookingRef: 'H3VI-STF',
    email: 'colm.moore@websummit.com',
    firstName: 'Colm',
    lastName: 'Moore',
  },
  'conor.broderick@websummit.com': {
    bookingRef: '57G2-STF',
    email: 'conor.broderick@websummit.com',
    firstName: 'Conor',
    lastName: 'Broderick',
  },
  'conor.buggle@cilabs.com': {
    bookingRef: '1GCB-STF',
    email: 'conor.buggle@cilabs.com',
    firstName: 'Conor',
    lastName: 'Buggle',
  },
  'conor.buggle@websummit.com': {
    bookingRef: 'LHDA-STF',
    email: 'conor.buggle@websummit.com',
    firstName: 'Conor',
    lastName: 'Buggle',
  },
  'conor.claffey@websummit.com': {
    bookingRef: 'HJLK-STF',
    email: 'conor.claffey@websummit.com',
    firstName: 'Conor',
    lastName: 'Claffey',
  },
  'craig.becker@websummit.com': {
    bookingRef: 'HHB5-STF',
    email: 'craig.becker@websummit.com',
    firstName: 'Craig',
    lastName: 'Becker',
  },
  'craig.obrien@websummit.com': {
    bookingRef: 'MOUD-STF',
    email: 'craig.obrien@websummit.com',
    firstName: 'Craig',
    lastName: "O'Brien",
  },
  'daniel.meijer@websummit.com': {
    bookingRef: 'PZSK-STF',
    email: 'daniel.meijer@websummit.com',
    firstName: 'Daniel',
    lastName: 'Meijer',
  },
  'dargan@websummit.com': {
    bookingRef: 'GTNX-STF',
    email: 'dargan@websummit.com',
    firstName: 'Dargan',
    lastName: 'Crowley Long',
  },
  'darragh.mccauley@websummit.com': {
    bookingRef: 'JLUS-STF',
    email: 'darragh.mccauley@websummit.com',
    firstName: 'Darragh',
    lastName: 'McCauley',
  },
  'darren.cleary@websummit.com': {
    bookingRef: 'Q33E-STF',
    email: 'darren.cleary@websummit.com',
    firstName: 'Darren',
    lastName: 'Cleary',
  },
  'dave.kenny@websummit.com': {
    bookingRef: 'XOOC-STF',
    email: 'dave.kenny@websummit.com',
    firstName: 'Dave',
    lastName: 'Kenny',
  },
  'david.jordan@websummit.com': {
    bookingRef: '1OIV-STF',
    email: 'david.jordan@websummit.com',
    firstName: 'David',
    lastName: 'Jordan',
  },
  'david@websummit.com': {
    bookingRef: 'L9YJ-STF',
    email: 'david@websummit.com',
    firstName: 'David',
    lastName: 'Kelly',
  },
  'dino.bikic@websummit.com': {
    bookingRef: 'G8C1-STF',
    email: 'dino.bikic@websummit.com',
    firstName: 'Dino',
    lastName: 'Bikic',
  },
  'domingos.dasilva@websummit.com': {
    bookingRef: 'H8HI-STF',
    email: 'domingos.dasilva@websummit.com',
    firstName: 'Domingos',
    lastName: 'Da Silva',
  },
  'donal.donovan@websummit.com': {
    bookingRef: 'T8LT-STF',
    email: 'donal.donovan@websummit.com',
    firstName: 'Donal',
    lastName: 'Donovan',
  },
  'dylan.hodge@websummit.com': {
    bookingRef: 'Z28J-STF',
    email: 'dylan.hodge@websummit.com',
    firstName: 'Dylan',
    lastName: 'Hodge',
  },
  'dylan@websummit.com': {
    bookingRef: 'RAKW-STF',
    email: 'dylan@websummit.com',
    firstName: 'Dylan',
    lastName: 'Kelly',
  },
  'eabha.smith@websummit.com': {
    bookingRef: 'BDDM-STF',
    email: 'eabha.smith@websummit.com',
    firstName: 'Eabha',
    lastName: 'Smith',
  },
  'eadaoin.fitzmaurice@websummit.com': {
    bookingRef: '8ORN-STF',
    email: 'eadaoin.fitzmaurice@websummit.com',
    firstName: 'Éadaoin',
    lastName: 'Fitzmaurice',
  },
  'eamon.defreitas@websummit.com': {
    bookingRef: '889B-STF',
    email: 'eamon.defreitas@websummit.com',
    firstName: 'Eamon',
    lastName: 'de Freitas',
  },
  'edel.hynes@websummit.com': {
    bookingRef: 'LC8O-STF',
    email: 'edel.hynes@websummit.com',
    firstName: 'Edel',
    lastName: 'Hynes',
  },
  'edel.prendergast@websummit.com': {
    bookingRef: '8KWF-STF',
    email: 'edel.prendergast@websummit.com',
    firstName: 'Edel',
    lastName: 'Prendergast',
  },
  'edgar.lopes@websummit.com': {
    bookingRef: 'ZZMR-STF',
    email: 'edgar.lopes@websummit.com',
    firstName: 'Edgar',
    lastName: 'Lopes',
  },
  'elaine.hanly@websummit.com': {
    bookingRef: 'BI3X-STF',
    email: 'elaine.hanly@websummit.com',
    firstName: 'Elaine',
    lastName: 'Hanly',
  },
  'elaine.watts@websummit.com': {
    bookingRef: '586A-STF',
    email: 'elaine.watts@websummit.com',
    firstName: 'Elaine',
    lastName: 'Watts',
  },
  'eleanor@websummit.com': {
    bookingRef: 'ON9Z-STF',
    email: 'eleanor@websummit.com',
    firstName: 'Eleanor',
    lastName: 'McGrath',
  },
  'emanuele.tozzato@websummit.com': {
    bookingRef: 'V2MV-STF',
    email: 'emanuele.tozzato@websummit.com',
    firstName: 'Emanuele',
    lastName: 'Tozzato',
  },
  'emma.murphy@websummit.com': {
    bookingRef: 'BTWY-STF',
    email: 'emma.murphy@websummit.com',
    firstName: 'Emma',
    lastName: 'Murphy',
  },
  'eoghan@websummit.com': {
    bookingRef: 'J4XS-STF',
    email: 'eoghan@websummit.com',
    firstName: 'Eoghan',
    lastName: 'McNeill',
  },
  'eoin.ocarroll@websummit.com': {
    bookingRef: 'QPY7-STF',
    email: 'eoin.ocarroll@websummit.com',
    firstName: 'Eoin',
    lastName: "O'Carroll",
  },
  'eoin.sheehan@websummit.com': {
    bookingRef: 'GLW1-STF',
    email: 'eoin.sheehan@websummit.com',
    firstName: 'Eoin',
    lastName: 'Sheehan',
  },
  'eugene.kazaev@websummit.com': {
    bookingRef: 'XJSM-STF',
    email: 'eugene.kazaev@websummit.com',
    firstName: 'Eugene',
    lastName: 'Kazaev',
  },
  'evan+demo@websummit.com': {
    bookingRef: 'DEMO-ONE',
    email: 'evan+demo@websummit.com',
    firstName: 'Demo',
    lastName: 'User',
  },
  'evan@websummit.com': {
    bookingRef: 'EVAN-STF',
    email: 'evan@websummit.com',
    firstName: 'Evan',
    lastName: "O'Brien",
  },
  'finian.green@websummit.com': {
    bookingRef: 'CRBP-STF',
    email: 'finian.green@websummit.com',
    firstName: 'Finian',
    lastName: 'Green',
  },
  'francesca.viterbo@websummit.com': {
    bookingRef: '8ZHV-STF',
    email: 'francesca.viterbo@websummit.com',
    firstName: 'Francesca',
    lastName: 'Viterbo',
  },
  'francisca.bernardo@websummit.com': {
    bookingRef: 'GBBL-STF',
    email: 'francisca.bernardo@websummit.com',
    firstName: 'Francisca',
    lastName: 'Bernardo',
  },
  'gabriel.karasekgageiro@websummit.com': {
    bookingRef: 'PJ4W-STF',
    email: 'gabriel.karasekgageiro@websummit.com',
    firstName: 'Gabriel',
    lastName: 'Karasek',
  },
  'gabriela.guedez@websummit.com': {
    bookingRef: 'UOE6-STF',
    email: 'gabriela.guedez@websummit.com',
    firstName: 'Gabriela',
    lastName: 'Guedez',
  },
  'gary.kelly@websummit.com': {
    bookingRef: '6WEC-STF',
    email: 'gary.kelly@websummit.com',
    firstName: 'Gary',
    lastName: 'Kelly',
  },
  'gavin.morrison@websummit.com': {
    bookingRef: 'PBOM-STF',
    email: 'gavin.morrison@websummit.com',
    firstName: 'Gavin',
    lastName: 'Morrison',
  },
  'geoff.wharton@websummit.com': {
    bookingRef: 'O1R2-STF',
    email: 'geoff.wharton@websummit.com',
    firstName: 'Geoffrey',
    lastName: 'Wharton',
  },
  'georgios.lamprou@websummit.com': {
    bookingRef: 'SI44-STF',
    email: 'georgios.lamprou@websummit.com',
    firstName: 'Georgios',
    lastName: 'Lamprou',
  },
  'gintare@websummit.com': {
    bookingRef: 'M2LG-STF',
    email: 'gintare@websummit.com',
    firstName: 'Gintare',
    lastName: 'Karalyte',
  },
  'grace.copeland@websummit.com': {
    bookingRef: 'T0GF-STF',
    email: 'grace.copeland@websummit.com',
    firstName: 'Grace',
    lastName: 'Copeland',
  },
  'greta.taylor@websummit.com': {
    bookingRef: 'NZ3Z-STF',
    email: 'greta.taylor@websummit.com',
    firstName: 'Greta',
    lastName: 'Taylor',
  },
  'hannah.glendon@websummit.com': {
    bookingRef: 'VETM-STF',
    email: 'hannah.glendon@websummit.com',
    firstName: 'Hannah',
    lastName: 'Glendon',
  },
  'hannah.large@websummit.com': {
    bookingRef: '8CBP-STF',
    email: 'hannah.large@websummit.com',
    firstName: 'Hannah',
    lastName: 'Large',
  },
  'haziq.zargar@websummit.com': {
    bookingRef: 'VR42-STF',
    email: 'haziq.zargar@websummit.com',
    firstName: 'Haziq',
    lastName: 'Zargar',
  },
  'helen.conway@websummit.com': {
    bookingRef: '9PCV-STF',
    email: 'helen.conway@websummit.com',
    firstName: 'Helen',
    lastName: 'Conway',
  },
  'henry.obrien@websummit.com': {
    bookingRef: 'CWE9-STF',
    email: 'henry.obrien@websummit.com',
    firstName: 'Henry',
    lastName: 'O’ Brien',
  },
  'hugh@websummit.com': {
    bookingRef: 'G6U4-STF',
    email: 'hugh@websummit.com',
    firstName: 'Hugh',
    lastName: 'Gallagher',
  },
  'ian.curtis@websummit.com': {
    bookingRef: 'T6WS-STF',
    email: 'ian.curtis@websummit.com',
    firstName: 'Ian',
    lastName: 'Curtis',
  },
  'ian.stevenson@websummit.com': {
    bookingRef: 'FO0Y-STF',
    email: 'ian.stevenson@websummit.com',
    firstName: 'Ian',
    lastName: 'Stevenson',
  },
  'ines.azevedo@websummit.com': {
    bookingRef: 'QUFN-STF',
    email: 'ines.azevedo@websummit.com',
    firstName: 'Inês',
    lastName: 'Azevedo',
  },
  'ines.cruz@websummit.com': {
    bookingRef: '603G-STF',
    email: 'ines.cruz@websummit.com',
    firstName: 'Inês',
    lastName: 'Cruz',
  },
  'ines.deroche@websummit.com': {
    bookingRef: 'TNSW-STF',
    email: 'ines.deroche@websummit.com',
    firstName: 'Ines',
    lastName: 'Deroche',
  },
  'ines.fradeira@websummit.com': {
    bookingRef: '39EE-STF',
    email: 'ines.fradeira@websummit.com',
    firstName: 'Inês',
    lastName: 'Cabral Fradeira ',
  },
  'ines.santos@websummit.com': {
    bookingRef: 'YEZ3-STF',
    email: 'ines.santos@websummit.com',
    firstName: 'Inês',
    lastName: 'Santos',
  },
  'jack.knox@websummit.com': {
    bookingRef: 'EQKR-STF',
    email: 'jack.knox@websummit.com',
    firstName: 'Jack',
    lastName: 'Knox',
  },
  'jake.mulcahy@websummit.com': {
    bookingRef: 'MC3J-STF',
    email: 'jake.mulcahy@websummit.com',
    firstName: 'Jake',
    lastName: 'Mulcahy',
  },
  'james.lenihan@websummit.com': {
    bookingRef: 'FULN-STF',
    email: 'james.lenihan@websummit.com',
    firstName: 'James',
    lastName: 'Lenihan',
  },
  'jamie.coyle@websummit.com': {
    bookingRef: '6OWL-STF',
    email: 'jamie.coyle@websummit.com',
    firstName: 'Jamie',
    lastName: 'Coyle',
  },
  'janina.yotova@websummit.com': {
    bookingRef: 'NJPN-STF',
    email: 'janina.yotova@websummit.com',
    firstName: 'Janina',
    lastName: 'Yotova',
  },
  'jennifer.keogh@websummit.com': {
    bookingRef: 'ECKJ-STF',
    email: 'jennifer.keogh@websummit.com',
    firstName: 'Jennifer',
    lastName: 'Keogh',
  },
  'jennifer.mcnaughton@websummit.com': {
    bookingRef: '2A7M-STF',
    email: 'jennifer.mcnaughton@websummit.com',
    firstName: 'Jen',
    lastName: 'McNaughton',
  },
  'jenny.odonoghue@websummit.com': {
    bookingRef: 'IOUL-STF',
    email: 'jenny.odonoghue@websummit.com',
    firstName: 'Jenny',
    lastName: "O'Donoghue",
  },
  'joan.mccarthy@websummit.com': {
    bookingRef: 'NOMX-STF',
    email: 'joan.mccarthy@websummit.com',
    firstName: 'Joan',
    lastName: 'McCarthy',
  },
  'joao.silva@websummit.com': {
    bookingRef: 'H5LY-STF',
    email: 'joao.silva@websummit.com',
    firstName: 'João',
    lastName: 'Silva',
  },
  'joao.soares@websummit.com': {
    bookingRef: 'JOAO-STF',
    email: 'joao.soares@websummit.com',
    firstName: 'João',
    lastName: 'Soares',
  },
  'johannes.vollertsen@websummit.com': {
    bookingRef: 'FGH0-STF',
    email: 'johannes.vollertsen@websummit.com',
    firstName: 'Johannes',
    lastName: 'Vollertsen',
  },
  'john.downey@websummit.com': {
    bookingRef: '5YQU-STF',
    email: 'john.downey@websummit.com',
    firstName: 'John',
    lastName: 'Downey',
  },
  'kacper.cygan@netguru.com': {
    bookingRef: '54DX-STF',
    email: 'kacper.cygan@netguru.com',
    firstName: 'Kacper',
    lastName: 'Cygan',
  },
  'kacper.michal.wojciechowski@netguru.com': {
    bookingRef: 'NHVS-STF',
    email: 'kacper.michal.wojciechowski@netguru.com',
    firstName: 'Kacper',
    lastName: 'Wojciechowski',
  },
  'karena.walshe@websummit.com': {
    bookingRef: 'D25K-STF',
    email: 'karena.walshe@websummit.com',
    firstName: 'Karena',
    lastName: 'Walshe',
  },
  'karl.fagan@websummit.com': {
    bookingRef: 'BTGR-STF',
    email: 'karl.fagan@websummit.com',
    firstName: 'Karl',
    lastName: 'Fagan',
  },
  'kat@websummit.com': {
    bookingRef: 'V6HD-STF',
    email: 'kat@websummit.com',
    firstName: 'Katarina',
    lastName: 'Black',
  },
  'katarina.cierna@websummit.com': {
    bookingRef: 'CGMZ-STF',
    email: 'katarina.cierna@websummit.com',
    firstName: 'Katarina',
    lastName: 'Cierna',
  },
  'katarina.micuchova@websummit.com': {
    bookingRef: '3DKC-STF',
    email: 'katarina.micuchova@websummit.com',
    firstName: 'Katarina',
    lastName: 'Micuchova',
  },
  'katarzyna.matusiak@websummit.com': {
    bookingRef: 'EEQ1-STF',
    email: 'katarzyna.matusiak@websummit.com',
    firstName: 'Katarzyna',
    lastName: 'Matusiak',
  },
  'katherine.farrell@websummit.com': {
    bookingRef: 'OXCC-STF',
    email: 'katherine.farrell@websummit.com',
    firstName: 'Katherine',
    lastName: 'Farrell',
  },
  'katie.bolger@websummit.com': {
    bookingRef: 'TOVZ-STF',
    email: 'katie.bolger@websummit.com',
    firstName: 'Katie',
    lastName: 'Bolger',
  },
  'keeva.bentham@websummit.com': {
    bookingRef: 'CT0C-STF',
    email: 'keeva.bentham@websummit.com',
    firstName: 'Keeva',
    lastName: 'Bentham',
  },
  'keith@websummit.com': {
    bookingRef: 'JJT3-STF',
    email: 'keith@websummit.com',
    firstName: 'Keith',
    lastName: 'Wallace',
  },
  'kerry.mcdevitt@websummit.com': {
    bookingRef: 'PO76-STF',
    email: 'kerry.mcdevitt@websummit.com',
    firstName: 'Kerry',
    lastName: 'Mc.Devitt',
  },
  'kevin.mcdonald@websummit.com': {
    bookingRef: 'X3RS-STF',
    email: 'kevin.mcdonald@websummit.com',
    firstName: 'Kevin',
    lastName: 'McDonald',
  },
  'kirsty.tobin@websummit.com': {
    bookingRef: 'AO3N-STF',
    email: 'kirsty.tobin@websummit.com',
    firstName: 'Kirsty',
    lastName: 'Tobin',
  },
  'konrad.timon@websummit.com': {
    bookingRef: 'QMQW-STF',
    email: 'konrad.timon@websummit.com',
    firstName: 'Konrad',
    lastName: 'Timon',
  },
  'kristina@websummit.com': {
    bookingRef: 'FXZH-STF',
    email: 'kristina@websummit.com',
    firstName: 'Kristina',
    lastName: 'Neligan',
  },
  'laoise.odwyer@websummit.com': {
    bookingRef: 'MHJ5-STF',
    email: 'laoise.odwyer@websummit.com',
    firstName: 'Laoise',
    lastName: "O'Dwyer",
  },
  'laura.oneill@websummit.com': {
    bookingRef: 'VIUO-STF',
    email: 'laura.oneill@websummit.com',
    firstName: 'Laura',
    lastName: "O'Neill",
  },
  'lauren.burke@websummit.com': {
    bookingRef: 'OWJB-STF',
    email: 'lauren.burke@websummit.com',
    firstName: 'Lauren',
    lastName: 'Burke',
  },
  'lauren.omahony@websummit.com': {
    bookingRef: 'YWYS-STF',
    email: 'lauren.omahony@websummit.com',
    firstName: 'Lauren',
    lastName: "O'Mahony",
  },
  'lee.campbell@websummit.com': {
    bookingRef: 'INBL-STF',
    email: 'lee.campbell@websummit.com',
    firstName: 'Lee',
    lastName: 'Campbell',
  },
  'lia.downer@websummit.com': {
    bookingRef: '1VU1-STF',
    email: 'lia.downer@websummit.com',
    firstName: 'Lia',
    lastName: 'Downer',
  },
  'lingyu.zhang@websummit.com': {
    bookingRef: '21RP-STF',
    email: 'lingyu.zhang@websummit.com',
    firstName: 'Lingyu',
    lastName: 'Zhang',
  },
  'lisa.armstrongbowles@websummit.com': {
    bookingRef: 'W4EY-STF',
    email: 'lisa.armstrongbowles@websummit.com',
    firstName: 'Lisa',
    lastName: 'Armstrong Bowles',
  },
  'lisa@websummit.com': {
    bookingRef: '3VQF-STF',
    email: 'lisa@websummit.com',
    firstName: 'Lisa',
    lastName: 'Gallagher',
  },
  'liyuan.ma@websummit.com': {
    bookingRef: 'RIQW-STF',
    email: 'liyuan.ma@websummit.com',
    firstName: 'Liyuan',
    lastName: 'Ma',
  },
  'lobna@websummit.com': {
    bookingRef: 'P9CA-STF',
    email: 'lobna@websummit.com',
    firstName: 'Lobna',
    lastName: 'Abulhassan',
  },
  'lorna.coakley@websummit.com': {
    bookingRef: '7PI2-STF',
    email: 'lorna.coakley@websummit.com',
    firstName: 'Lorna',
    lastName: 'Coakley',
  },
  'luan.mckenna@websummit.com': {
    bookingRef: 'HTLP-STF',
    email: 'luan.mckenna@websummit.com',
    firstName: 'Luan',
    lastName: 'McKenna',
  },
  'luca.viola@websummit.com': {
    bookingRef: 'C571-STF',
    email: 'luca.viola@websummit.com',
    firstName: 'Luca',
    lastName: 'Viola',
  },
  'lucas.baptista@websummit.com': {
    bookingRef: 'FOZY-STF',
    email: 'lucas.baptista@websummit.com',
    firstName: 'Lucas',
    lastName: 'Baptista',
  },
  'lucia.gavin@websummit.com': {
    bookingRef: 'W6AX-STF',
    email: 'lucia.gavin@websummit.com',
    firstName: 'Lucia',
    lastName: 'Gavin',
  },
  'lucia.hastings@websummit.com': {
    bookingRef: 'OVAY-STF',
    email: 'lucia.hastings@websummit.com',
    firstName: 'Lucia',
    lastName: 'Hastings',
  },
  'luis.serralheiro@websummit.com': {
    bookingRef: 'W78E-STF',
    email: 'luis.serralheiro@websummit.com',
    firstName: 'Luis',
    lastName: 'Serralheiro',
  },
  'luke.byrne@websummit.com': {
    bookingRef: '3ZWS-STF',
    email: 'luke.byrne@websummit.com',
    firstName: 'Luke',
    lastName: 'Byrne',
  },
  'luke.prendeville@websummit.com': {
    bookingRef: '888Q-STF',
    email: 'luke.prendeville@websummit.com',
    firstName: 'Luke',
    lastName: 'Prendeville',
  },
  'lynn.kenny@websummit.com': {
    bookingRef: 'QD60-STF',
    email: 'lynn.kenny@websummit.com',
    firstName: 'Lynn',
    lastName: 'Kenny',
  },
  'maeve.mcquillan@websummit.com': {
    bookingRef: 'DDE0-STF',
    email: 'maeve.mcquillan@websummit.com',
    firstName: 'Maeve',
    lastName: 'McQuillan',
  },
  'manon.racine@websummit.com': {
    bookingRef: 'QWU9-STF',
    email: 'manon.racine@websummit.com',
    firstName: 'Manon',
    lastName: 'Racine',
  },
  'marek.parafianowicz@netguru.com': {
    bookingRef: '20HJ-STF',
    email: 'marek.parafianowicz@netguru.com',
    firstName: 'Marek',
    lastName: 'Parafianowicz',
  },
  'marek.parafianowicz@websummit.com': {
    bookingRef: 'FHOD-STF',
    email: 'marek.parafianowicz@websummit.com',
    firstName: 'Marek',
    lastName: 'Parafianowicz',
  },
  'maria.payandee@websummit.com': {
    bookingRef: 'PJ06-STF',
    email: 'maria.payandee@websummit.com',
    firstName: 'Maria',
    lastName: 'Payandee',
  },
  'marie.degery@websummit.com': {
    bookingRef: 'I5JT-STF',
    email: 'marie.degery@websummit.com',
    firstName: 'Marie',
    lastName: 'Degery',
  },
  'marija.citic@websummit.com': {
    bookingRef: '2YGS-STF',
    email: 'marija.citic@websummit.com',
    firstName: 'Marija',
    lastName: 'Citic',
  },
  'mark.mcgann@websummit.com': {
    bookingRef: 'UD5E-STF',
    email: 'mark.mcgann@websummit.com',
    firstName: 'Mark',
    lastName: 'McGann',
  },
  'mark.powell@websummit.com': {
    bookingRef: 'PBJO-STF',
    email: 'mark.powell@websummit.com',
    firstName: 'Mark',
    lastName: 'Powell',
  },
  'mark.teeple@websummit.com': {
    bookingRef: 'NW4M-STF',
    email: 'mark.teeple@websummit.com',
    firstName: 'Mark',
    lastName: 'Teeple',
  },
  'martyna.kupidura+t3@netguru.com': {
    bookingRef: 'UNLY-STF',
    email: 'martyna.kupidura+t3@netguru.com',
    firstName: 'Martyna',
    lastName: 'Kowalska (staff for now, convert to an attendee later)',
  },
  'marvin.hofmann@websummit.com': {
    bookingRef: 'MARV-STF',
    email: 'marvin.hofmann@websummit.com',
    firstName: 'Marvin',
    lastName: 'Hofmann',
  },
  'mary.kavanagh@websummit.com': {
    bookingRef: '4UVX-STF',
    email: 'mary.kavanagh@websummit.com',
    firstName: 'Mary',
    lastName: 'Kavanagh',
  },
  'mateusz.kluge@netguru.com': {
    bookingRef: 'I9CH-STF',
    email: 'mateusz.kluge@netguru.com',
    firstName: 'Mateusz',
    lastName: 'Kluge',
  },
  'megan.sheridan@websummit.com': {
    bookingRef: 'HVME-STF',
    email: 'megan.sheridan@websummit.com',
    firstName: 'Megan',
    lastName: 'Sheridan',
  },
  'michael.harnett@websummit.com': {
    bookingRef: 'CEOO-STF',
    email: 'michael.harnett@websummit.com',
    firstName: 'Michael',
    lastName: 'Harnett',
  },
  'michael.whelan@websummit.com': {
    bookingRef: 'FEPQ-STF',
    email: 'michael.whelan@websummit.com',
    firstName: 'Mike',
    lastName: 'Whelan',
  },
  'micky.gangwani@websummit.com': {
    bookingRef: 'YEGX-STF',
    email: 'micky.gangwani@websummit.com',
    firstName: 'Micky',
    lastName: 'Gangwani',
  },
  'mike@websummit.com': {
    bookingRef: 'WPF7-STF',
    email: 'mike@websummit.com',
    firstName: 'Mike',
    lastName: 'Sexton',
  },
  'mirella.vanbalen@websummit.com': {
    bookingRef: '0O30-STF',
    email: 'mirella.vanbalen@websummit.com',
    firstName: 'Mirella',
    lastName: 'Van Balen',
  },
  'naomi.agnew@websummit.com': {
    bookingRef: '4UEL-STF',
    email: 'naomi.agnew@websummit.com',
    firstName: 'Naomi',
    lastName: 'Agnew',
  },
  'nassim.amara@websummit.com': {
    bookingRef: 'WQEW-STF',
    email: 'nassim.amara@websummit.com',
    firstName: 'Nassim',
    lastName: 'Amara',
  },
  'niall.khoaz@websummit.com': {
    bookingRef: '4C9P-STF',
    email: 'niall.khoaz@websummit.com',
    firstName: 'Niall',
    lastName: 'Khoaz',
  },
  'niamh.oconnor@websummit.com': {
    bookingRef: 'BI4B-STF',
    email: 'niamh.oconnor@websummit.com',
    firstName: 'Niamh',
    lastName: "O'Connor",
  },
  'nida@websummit.com': {
    bookingRef: 'DJPF-STF',
    email: 'nida@websummit.com',
    firstName: 'Nida',
    lastName: 'Shah',
  },
  'nidhi.naithani@websummit.com': {
    bookingRef: 'XDIH-STF',
    email: 'nidhi.naithani@websummit.com',
    firstName: 'Nidhi',
    lastName: 'Naithani',
  },
  'nuno.ramao@websummit.com': {
    bookingRef: 'K2YJ-STF',
    email: 'nuno.ramao@websummit.com',
    firstName: 'Nuno',
    lastName: 'Ramāo',
  },
  'nuno.romao@websummit.com': {
    bookingRef: 'W0G8-STF',
    email: 'nuno.romao@websummit.com',
    firstName: 'Nuno',
    lastName: 'Romão',
  },
  'paddy@websummit.com': {
    bookingRef: 'WACD-STF',
    email: 'paddy@websummit.com',
    firstName: 'Paddy',
    lastName: 'Cosgrave',
  },
  'patrice@websummit.com': {
    bookingRef: 'EQ2O-STF',
    email: 'patrice@websummit.com',
    firstName: 'Patrice',
    lastName: 'Finneran',
  },
  'patrick.griffith@websummit.com': {
    bookingRef: 'FXOA-STF',
    email: 'patrick.griffith@websummit.com',
    firstName: 'Patrick',
    lastName: 'Griffith',
  },
  'patrick.kelly@websummit.com': {
    bookingRef: 'CNMM-STF',
    email: 'patrick.kelly@websummit.com',
    firstName: 'Patrick',
    lastName: 'Kelly',
  },
  'patrick.kirwan@websummit.com': {
    bookingRef: 'VCHZ-STF',
    email: 'patrick.kirwan@websummit.com',
    firstName: 'Paddy',
    lastName: 'Kirwan',
  },
  'patrycja.batko@netguru.com': {
    bookingRef: '8OTZ-STF',
    email: 'patrycja.batko@netguru.com',
    firstName: 'Patrycja',
    lastName: 'Batko',
  },
  'paul.butler@websummit.com': {
    bookingRef: 'LZIS-STF',
    email: 'paul.butler@websummit.com',
    firstName: 'Paul',
    lastName: 'Butler',
  },
  'paul.moore@websummit.com': {
    bookingRef: 'F6XN-STF',
    email: 'paul.moore@websummit.com',
    firstName: 'Paul',
    lastName: 'Anthony Moore',
  },
  'paul.omahony@websummit.com': {
    bookingRef: 'K9TM-STF',
    email: 'paul.omahony@websummit.com',
    firstName: 'Paul',
    lastName: "O'Mahony",
  },
  'pawel.parafiniuk@netguru.com': {
    bookingRef: 'ZRJ5-STF',
    email: 'pawel.parafiniuk@netguru.com',
    firstName: 'Paweł',
    lastName: 'Parafiniuk',
  },
  'peterg@websummit.com': {
    bookingRef: 'BLSB-STF',
    email: 'peterg@websummit.com',
    firstName: 'Peter',
    lastName: 'Gilmer',
  },
  'pm@amaranthine.com': {
    bookingRef: 'MD0M-STF',
    email: 'pm@amaranthine.com',
    firstName: 'Patrick',
    lastName: 'Murphy',
  },
  'rachel.monahan@websummit.com': {
    bookingRef: 'LKRF-STF',
    email: 'rachel.monahan@websummit.com',
    firstName: 'Rachel',
    lastName: 'Monahan',
  },
  'rachel.wheeler@websummit.com': {
    bookingRef: 'QNBO-STF',
    email: 'rachel.wheeler@websummit.com',
    firstName: 'Rachel Wheeler',
    lastName: '(She / Her)',
  },
  'raxitpaul.louis@websummit.com': {
    bookingRef: 'N5SC-STF',
    email: 'raxitpaul.louis@websummit.com',
    firstName: 'Raxit Paul',
    lastName: 'Louis',
  },
  'rebecca.connolly@websummit.com': {
    bookingRef: 'RSCN-STF',
    email: 'rebecca.connolly@websummit.com',
    firstName: 'Rebecca',
    lastName: 'Connolly',
  },
  'rebecca.ryan@websummit.com': {
    bookingRef: 'E1JI-STF',
    email: 'rebecca.ryan@websummit.com',
    firstName: 'Rebecca',
    lastName: 'Ryan',
  },
  'renee.daly@websummit.com': {
    bookingRef: 'C8CH-STF',
    email: 'renee.daly@websummit.com',
    firstName: 'Renee',
    lastName: 'Daly',
  },
  'ricardo.lima@websummit.com': {
    bookingRef: 'VQ6C-STF',
    email: 'ricardo.lima@websummit.com',
    firstName: 'Ricardo',
    lastName: 'Lima',
  },
  'ricardo.pinto@websummit.com': {
    bookingRef: 'VGBM-STF',
    email: 'ricardo.pinto@websummit.com',
    firstName: 'Ricardo',
    lastName: 'Gandara Pinto',
  },
  'rob.reid@websummit.com': {
    bookingRef: 'C74F-STF',
    email: 'rob.reid@websummit.com',
    firstName: 'Rob',
    lastName: 'Reid',
  },
  'robert.babos@websummit.com': {
    bookingRef: '27GV-STF',
    email: 'robert.babos@websummit.com',
    firstName: 'Rob',
    lastName: 'Babos',
  },
  'robert.fitzgerald@websummit.com': {
    bookingRef: '5B0L-STF',
    email: 'robert.fitzgerald@websummit.com',
    firstName: 'Robbie',
    lastName: 'Fitzgerald',
  },
  'robert.lynch@websummit.com': {
    bookingRef: '5BL4-STF',
    email: 'robert.lynch@websummit.com',
    firstName: 'Robert',
    lastName: 'Lynch',
  },
  'roberto.decurnex@websummit.com': {
    bookingRef: 'IAE6-STF',
    email: 'roberto.decurnex@websummit.com',
    firstName: 'Roberto',
    lastName: 'Decurnex',
  },
  'ronan.mooney@websummit.com': {
    bookingRef: 'XJ91-STF',
    email: 'ronan.mooney@websummit.com',
    firstName: 'Ronan',
    lastName: 'Mooney',
  },
  'ronan.yore@websummit.com': {
    bookingRef: '0GUP-STF',
    email: 'ronan.yore@websummit.com',
    firstName: 'Ronan',
    lastName: 'Yore',
  },
  'rory.beirne@websummit.com': {
    bookingRef: '1CPS-STF',
    email: 'rory.beirne@websummit.com',
    firstName: 'Rory',
    lastName: 'Beirne',
  },
  'sarah.coffey@websummit.com': {
    bookingRef: 'VMIR-STF',
    email: 'sarah.coffey@websummit.com',
    firstName: 'Sarah',
    lastName: 'Coffey',
  },
  'sarahjane.allen@websummit.com': {
    bookingRef: '1Q5P-STF',
    email: 'sarahjane.allen@websummit.com',
    firstName: 'Sarah Jane',
    lastName: 'Allen',
  },
  'sean.curtin@websummit.com': {
    bookingRef: 'WDZT-STF',
    email: 'sean.curtin@websummit.com',
    firstName: 'Sean',
    lastName: 'Curtin',
  },
  'sebastian.white@websummit.com': {
    bookingRef: 'D7I7-STF',
    email: 'sebastian.white@websummit.com',
    firstName: 'Sebastian',
    lastName: 'White',
  },
  'shane.tynan@websummit.com': {
    bookingRef: '1V0C-STF',
    email: 'shane.tynan@websummit.com',
    firstName: 'Shane',
    lastName: 'Tynan',
  },
  'shauna.kiely@websummit.com': {
    bookingRef: '94XH-STF',
    email: 'shauna.kiely@websummit.com',
    firstName: 'Shauna',
    lastName: 'Kiely',
  },
  'sine.mcgoff@websummit.com': {
    bookingRef: 'U47T-STF',
    email: 'sine.mcgoff@websummit.com',
    firstName: 'Síne',
    lastName: 'McGoff',
  },
  'soraia.lage@websummit.com': {
    bookingRef: 'FL3I-STF',
    email: 'soraia.lage@websummit.com',
    firstName: 'Soraia',
    lastName: 'Torres Lage',
  },
  'sorcha.killian@websummit.com': {
    bookingRef: 'BV8G-STF',
    email: 'sorcha.killian@websummit.com',
    firstName: 'Sorcha',
    lastName: 'Killian',
  },
  'stephanie.quilligan@websummit.com': {
    bookingRef: '7I6S-STF',
    email: 'stephanie.quilligan@websummit.com',
    firstName: 'Stephanie',
    lastName: 'Quilligan',
  },
  'stephen@websummit.com': {
    bookingRef: 'VASR-STF',
    email: 'stephen@websummit.com',
    firstName: 'Stephen',
    lastName: 'Twomey',
  },
  'steven@websummit.com': {
    bookingRef: 'DDYZ-STF',
    email: 'steven@websummit.com',
    firstName: 'Steven',
    lastName: 'Tobin',
  },
  'sunil.sharma@websummit.com': {
    bookingRef: 'SHOA-STF',
    email: 'sunil.sharma@websummit.com',
    firstName: 'Sunil',
    lastName: 'Sharma',
  },
  'suzanne.taylor@websummit.com': {
    bookingRef: 'N5X1-STF',
    email: 'suzanne.taylor@websummit.com',
    firstName: 'Suzanne',
    lastName: 'Taylor',
  },
  'sylviane.coquard@websummit.com': {
    bookingRef: 'JXDR-STF',
    email: 'sylviane.coquard@websummit.com',
    firstName: 'Sylviane',
    lastName: 'Coquard',
  },
  'tebra@websummit.com': {
    bookingRef: 'QKHI-STF',
    email: 'tebra@websummit.com',
    firstName: 'Tebra',
    lastName: 'Hynes',
  },
  'thierry@websummit.com': {
    bookingRef: 'MRTY-STF',
    email: 'thierry@websummit.com',
    firstName: 'Thierry',
    lastName: 'Michel',
  },
  'thomas.moen+test@websummit.com': {
    bookingRef: 'J3UB-STF',
    email: 'thomas.moen+test@websummit.com',
    firstName: 'Thomas',
    lastName: 'Test Moen',
  },
  'thomas.moen@websummit.com': {
    bookingRef: 'GJU6-STF',
    email: 'thomas.moen@websummit.com',
    firstName: 'Thomas',
    lastName: 'Moen',
  },
  'tim.kiernan@websummit.com': {
    bookingRef: 'EOTW-STF',
    email: 'tim.kiernan@websummit.com',
    firstName: 'Tim',
    lastName: 'Kiernan',
  },
  'tom.svecak@websummit.com': {
    bookingRef: 'CPX0-STF',
    email: 'tom.svecak@websummit.com',
    firstName: 'Tom',
    lastName: 'Svecak',
  },
  'tom@websummit.com': {
    bookingRef: 'JQAH-STF',
    email: 'tom@websummit.com',
    firstName: 'Tom',
    lastName: "O'Reilly",
  },
  'tomasz.rdzak@websummit.com': {
    bookingRef: 'N6AN-STFY',
    email: 'tomasz.rdzak@websummit.com',
    firstName: 'Tomasz',
    lastName: 'Rdzak',
  },
  'tome.duarte@websummit.com': {
    bookingRef: 'H7LR-STF',
    email: 'tome.duarte@websummit.com',
    firstName: 'Tomé',
    lastName: 'Duarte',
  },
  'tomislav.svecak@websummit.com': {
    bookingRef: 'GZM8-STF',
    email: 'tomislav.svecak@websummit.com',
    firstName: 'Tomislav',
    lastName: 'Svecak',
  },
  'trevor@websummit.com': {
    bookingRef: 'LRDG-STF',
    email: 'trevor@websummit.com',
    firstName: 'Trevor',
    lastName: 'Merrey',
  },
  'victor.jager@websummit.com': {
    bookingRef: 'OGVN-STF',
    email: 'victor.jager@websummit.com',
    firstName: 'Victor',
    lastName: 'Jager',
  },
  'wale.lawal@websummit.com': {
    bookingRef: 'VFRQ-STF',
    email: 'wale.lawal@websummit.com',
    firstName: 'Wale',
    lastName: 'Lawal',
  },
  'wesley@websummit.com': {
    bookingRef: 'HK1Q-STF',
    email: 'wesley@websummit.com',
    firstName: 'Wesley',
    lastName: 'Farrell',
  },
  'wez.evans@websummit.com': {
    bookingRef: 'TGBR-STF',
    email: 'wez.evans@websummit.com',
    firstName: 'Wez',
    lastName: 'Evans',
  },
  'yvonne.redmond@websummit.com': {
    bookingRef: 'LDDD-STF',
    email: 'yvonne.redmond@websummit.com',
    firstName: 'Yvonne',
    lastName: 'Redmond',
  },
  'zara.mcgrath@websummit.com': {
    bookingRef: 'YK86-STF',
    email: 'zara.mcgrath@websummit.com',
    firstName: 'Zara',
    lastName: 'McGrath',
  },
};

/*
// conferences for manual config

const ws20: Conference = {
  guestProductId: '65e53977-9efa-4937-bdf7-340a8a131862',
  slug: 'ws20',
  staffProductId: '56ba3c20-ee93-4aa7-8400-2ffc22f36a92',
  storeId: '22d0f54a-35ef-4dcc-a2b3-1e6c8f99a41f',
};

const tfh20: Conference = {
  slug: 'tfh20',
  staffProductId: 'daa9e08b-409c-4ce2-9c45-f220d33101c1',
  storeId: '7ada51b5-eed4-44f9-852c-9ef5b20e16a1',
};

const prod_tfh20: Conference = {
  slug: 'tfh20',
  staffProductId: 'b4cb4ae6-bd23-4714-b98a-d00d6eced94a',
  storeId: 'd4bd55f7-b8f5-44f3-a458-4c1609a42588',
};

const sandboxApiUrl = 'https://catalyst.cluster.cilabs.net/graphql';
const prodApiUrl = 'https://api.cilabs.com/catalyst';

*/
const prod_cc21: Conference = {
  slug: 'cc21',
  staffProductId: '6c607f74-d375-48ae-a705-97035e494c96',
  storeId: '32d6f737-1ce9-4ac1-9c23-8e4668292268',
};

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => (
    <App conference={prod_cc21} staffList={staffList} {...props} />
  ),
});

export const { bootstrap, mount, unmount, update } = lifecycles;
