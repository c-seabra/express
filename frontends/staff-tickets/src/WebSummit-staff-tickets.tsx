import './set-public-path'
import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import App, {Conference} from './components/app/App'

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
  "edgar.lopes@websummit.com": {
    "email": "edgar.lopes@websummit.com",
    "bookingRef": "ZZMR-STF",
    "firstName": "Edgar",
    "lastName": "Lopes"
  },
  "lucas.baptista@websummit.com": {
    "email": "lucas.baptista@websummit.com",
    "bookingRef": "FOZY-STF",
    "firstName": "Lucas",
    "lastName": "Baptista"
  },
  "kacper.cygan@netguru.com": {
    "email": "kacper.cygan@netguru.com",
    "bookingRef": "54DX-STF",
    "firstName": "Kacper",
    "lastName": "Cygan"
  },
  "evan+demo@websummit.com": {
    "email": "evan+demo@websummit.com",
    "bookingRef": "DEMO-ONE",
    "firstName": "Demo",
    "lastName": "User"
  },
  "kacper.michal.wojciechowski@netguru.com": {
    "email": "kacper.michal.wojciechowski@netguru.com",
    "bookingRef": "NHVS-STF",
    "firstName": "Kacper",
    "lastName": "Wojciechowski"
  },
  "pawel.parafiniuk@netguru.com": {
    "email": "pawel.parafiniuk@netguru.com",
    "bookingRef": "ZRJ5-STF",
    "firstName": "Paweł",
    "lastName": "Parafiniuk"
  },
  "marek.parafianowicz@netguru.com": {
    "email": "marek.parafianowicz@netguru.com",
    "bookingRef": "20HJ-STF",
    "firstName": "Marek",
    "lastName": "Parafianowicz"
  },
  "marvin.hofmann@websummit.com": {
    "email": "marvin.hofmann@websummit.com",
    "bookingRef": "MARV-STF",
    "firstName": "Marvin",
    "lastName": "Hofmann"
  },
  "patrycja.batko@netguru.com": {
    "email": "patrycja.batko@netguru.com",
    "bookingRef": "8OTZ-STF",
    "firstName": "Patrycja",
    "lastName": "Batko"
  },
  "mateusz.kluge@netguru.com": {
    "email": "mateusz.kluge@netguru.com",
    "bookingRef": "I9CH-STF",
    "firstName": "Mateusz",
    "lastName": "Kluge"
  },
  "shane.tynan@websummit.com": {
    "email": "shane.tynan@websummit.com",
    "bookingRef": "1V0C-STF",
    "firstName": "Shane",
    "lastName": "Tynan"
  },
  "emanuele.tozzato@websummit.com": {
    "email": "emanuele.tozzato@websummit.com",
    "bookingRef": "V2MV-STF",
    "firstName": "Emanuele",
    "lastName": "Tozzato"
  },
  "joao.silva@websummit.com": {
    "email": "joao.silva@websummit.com",
    "bookingRef": "H5LY-STF",
    "firstName": "João",
    "lastName": "Silva"
  },
  "wale.lawal@websummit.com": {
    "email": "wale.lawal@websummit.com",
    "bookingRef": "VFRQ-STF",
    "firstName": "Wale",
    "lastName": "Lawal"
  },
  "bernardo.jose@websummit.com": {
    "email": "bernardo.jose@websummit.com",
    "bookingRef": "MQQN-STF",
    "firstName": "Bernardo",
    "lastName": "Jose"
  },
  "tome.duarte@websummit.com": {
    "email": "tome.duarte@websummit.com",
    "bookingRef": "H7LR-STF",
    "firstName": "Tomé",
    "lastName": "Duarte"
  },
  "domingos.dasilva@websummit.com": {
    "email": "domingos.dasilva@websummit.com",
    "bookingRef": "H8HI-STF",
    "firstName": "Domingos",
    "lastName": "Da Silva"
  },
  "soraia.lage@websummit.com": {
    "email": "soraia.lage@websummit.com",
    "bookingRef": "FL3I-STF",
    "firstName": "Soraia",
    "lastName": "Torres Lage"
  },
  "brian.tobin@websummit.com": {
    "email": "brian.tobin@websummit.com",
    "bookingRef": "F0FI-STF",
    "firstName": "Brian",
    "lastName": "Tobin"
  },
  "rachel.monahan@websummit.com": {
    "email": "rachel.monahan@websummit.com",
    "bookingRef": "LKRF-STF",
    "firstName": "Rachel",
    "lastName": "Monahan"
  },
  "ricardo.lima@websummit.com": {
    "email": "ricardo.lima@websummit.com",
    "bookingRef": "VQ6C-STF",
    "firstName": "Ricardo",
    "lastName": "Lima"
  },
  "sorcha.killian@websummit.com": {
    "email": "sorcha.killian@websummit.com",
    "bookingRef": "BV8G-STF",
    "firstName": "Sorcha",
    "lastName": "Killian"
  },
  "ines.fradeira@websummit.com": {
    "email": "ines.fradeira@websummit.com",
    "bookingRef": "39EE-STF",
    "firstName": "Inês",
    "lastName": "Cabral Fradeira "
  },
  "robert.fitzgerald@websummit.com": {
    "email": "robert.fitzgerald@websummit.com",
    "bookingRef": "5B0L-STF",
    "firstName": "Robbie",
    "lastName": "Fitzgerald"
  },
  "ines.deroche@websummit.com": {
    "email": "ines.deroche@websummit.com",
    "bookingRef": "TNSW-STF",
    "firstName": "Ines",
    "lastName": "Deroche"
  },
  "sean.curtin@websummit.com": {
    "email": "sean.curtin@websummit.com",
    "bookingRef": "WDZT-STF",
    "firstName": "Sean",
    "lastName": "Curtin"
  },
  "cathal.curry@websummit.com": {
    "email": "cathal.curry@websummit.com",
    "bookingRef": "YLT2-STF",
    "firstName": "Cathal",
    "lastName": "Curry"
  },
  "jamie.coyle@websummit.com": {
    "email": "jamie.coyle@websummit.com",
    "bookingRef": "6OWL-STF",
    "firstName": "Jamie",
    "lastName": "Coyle"
  },
  "ian.stevenson@websummit.com": {
    "email": "ian.stevenson@websummit.com",
    "bookingRef": "FO0Y-STF",
    "firstName": "Ian",
    "lastName": "Stevenson"
  },
  "maria.payandee@websummit.com": {
    "email": "maria.payandee@websummit.com",
    "bookingRef": "PJ06-STF",
    "firstName": "Maria",
    "lastName": "Payandee"
  },
  "alice.mcdermott@websummit.com": {
    "email": "alice.mcdermott@websummit.com",
    "bookingRef": "JA8F-STF",
    "firstName": "Alice",
    "lastName": "McDermott"
  },
  "aine.kavanagh@websummit.com": {
    "email": "aine.kavanagh@websummit.com",
    "bookingRef": "MWBD-STF",
    "firstName": "Aine",
    "lastName": "Kavanagh"
  },
  "tebra@websummit.com": {
    "email": "tebra@websummit.com",
    "bookingRef": "QKHI-STF",
    "firstName": "Tebra",
    "lastName": "Hynes"
  },
  "lauren.burke@websummit.com": {
    "email": "lauren.burke@websummit.com",
    "bookingRef": "OWJB-STF",
    "firstName": "Lauren",
    "lastName": "Burke"
  },
  "yvonne.redmond@websummit.com": {
    "email": "yvonne.redmond@websummit.com",
    "bookingRef": "LDDD-STF",
    "firstName": "Yvonne",
    "lastName": "Redmond"
  },
  "stephanie.quilligan@websummit.com": {
    "email": "stephanie.quilligan@websummit.com",
    "bookingRef": "7I6S-STF",
    "firstName": "Stephanie",
    "lastName": "Quilligan"
  },
  "laura.oneill@websummit.com": {
    "email": "laura.oneill@websummit.com",
    "bookingRef": "VIUO-STF",
    "firstName": "Laura",
    "lastName": "O'Neill"
  },
  "gavin.morrison@websummit.com": {
    "email": "gavin.morrison@websummit.com",
    "bookingRef": "PBOM-STF",
    "firstName": "Gavin",
    "lastName": "Morrison"
  },
  "colm.moore@websummit.com": {
    "email": "colm.moore@websummit.com",
    "bookingRef": "H3VI-STF",
    "firstName": "Colm",
    "lastName": "Moore"
  },
  "katarina.micuchova@websummit.com": {
    "email": "katarina.micuchova@websummit.com",
    "bookingRef": "3DKC-STF",
    "firstName": "Katarina",
    "lastName": "Micuchova"
  },
  "daniel.meijer@websummit.com": {
    "email": "daniel.meijer@websummit.com",
    "bookingRef": "PZSK-STF",
    "firstName": "Daniel",
    "lastName": "Meijer"
  },
  "luan.mckenna@websummit.com": {
    "email": "luan.mckenna@websummit.com",
    "bookingRef": "HTLP-STF",
    "firstName": "Luan",
    "lastName": "McKenna"
  },
  "darragh.mccauley@websummit.com": {
    "email": "darragh.mccauley@websummit.com",
    "bookingRef": "JLUS-STF",
    "firstName": "Darragh",
    "lastName": "McCauley"
  },
  "carol.lin@websummit.com": {
    "email": "carol.lin@websummit.com",
    "bookingRef": "840L-STF",
    "firstName": "Carol (Yijing)",
    "lastName": "Lin"
  },
  "lucia.gavin@websummit.com": {
    "email": "lucia.gavin@websummit.com",
    "bookingRef": "W6AX-STF",
    "firstName": "Lucia",
    "lastName": "Gavin"
  },
  "hugh@websummit.com": {
    "email": "hugh@websummit.com",
    "bookingRef": "G6U4-STF",
    "firstName": "Hugh",
    "lastName": "Gallagher"
  },
  "ahmed.elbanna@websummit.com": {
    "email": "ahmed.elbanna@websummit.com",
    "bookingRef": "5WSV-STF",
    "firstName": "Ahmed",
    "lastName": "El-Banna"
  },
  "brian.curran@websummit.com": {
    "email": "brian.curran@websummit.com",
    "bookingRef": "JQDH-STF",
    "firstName": "Brian",
    "lastName": "Curran"
  },
  "helen.conway@websummit.com": {
    "email": "helen.conway@websummit.com",
    "bookingRef": "9PCV-STF",
    "firstName": "Helen",
    "lastName": "Conway"
  },
  "darren.cleary@websummit.com": {
    "email": "darren.cleary@websummit.com",
    "bookingRef": "Q33E-STF",
    "firstName": "Darren",
    "lastName": "Cleary"
  },
  "lobna@websummit.com": {
    "email": "lobna@websummit.com",
    "bookingRef": "P9CA-STF",
    "firstName": "Lobna",
    "lastName": "Abulhassan"
  },
  "eabha.smith@websummit.com": {
    "email": "eabha.smith@websummit.com",
    "bookingRef": "BDDM-STF",
    "firstName": "Eabha",
    "lastName": "Smith"
  },
  "ines.santos@websummit.com": {
    "email": "ines.santos@websummit.com",
    "bookingRef": "YEZ3-STF",
    "firstName": "Inês",
    "lastName": "Santos"
  },
  "manon.racine@websummit.com": {
    "email": "manon.racine@websummit.com",
    "bookingRef": "QWU9-STF",
    "firstName": "Manon",
    "lastName": "Racine"
  },
  "jack.knox@websummit.com": {
    "email": "jack.knox@websummit.com",
    "bookingRef": "EQKR-STF",
    "firstName": "Jack",
    "lastName": "Knox"
  },
  "lynn.kenny@websummit.com": {
    "email": "lynn.kenny@websummit.com",
    "bookingRef": "QD60-STF",
    "firstName": "Lynn",
    "lastName": "Kenny"
  },
  "lucia.hastings@websummit.com": {
    "email": "lucia.hastings@websummit.com",
    "bookingRef": "OVAY-STF",
    "firstName": "Lucia",
    "lastName": "Hastings"
  },
  "hannah.glendon@websummit.com": {
    "email": "hannah.glendon@websummit.com",
    "bookingRef": "VETM-STF",
    "firstName": "Hannah",
    "lastName": "Glendon"
  },
  "francisca.bernardo@websummit.com": {
    "email": "francisca.bernardo@websummit.com",
    "bookingRef": "GBBL-STF",
    "firstName": "Francisca",
    "lastName": "Bernardo"
  },
  "naomi.agnew@websummit.com": {
    "email": "naomi.agnew@websummit.com",
    "bookingRef": "4UEL-STF",
    "firstName": "Naomi",
    "lastName": "Agnew"
  },
  "keith@websummit.com": {
    "email": "keith@websummit.com",
    "bookingRef": "JJT3-STF",
    "firstName": "Keith",
    "lastName": "Wallace"
  },
  "evan@websummit.com": {
    "email": "evan@websummit.com",
    "bookingRef": "EVAN-STF",
    "firstName": "Evan",
    "lastName": "O'Brien"
  },
  "wesley@websummit.com": {
    "email": "wesley@websummit.com",
    "bookingRef": "HK1Q-STF",
    "firstName": "Wesley",
    "lastName": "Farrell"
  },
  "nuno.romao@websummit.com": {
    "email": "nuno.romao@websummit.com",
    "bookingRef": "W0G8-STF",
    "firstName": "Nuno",
    "lastName": "Romão"
  },
  "nidhi.naithani@websummit.com": {
    "email": "nidhi.naithani@websummit.com",
    "bookingRef": "XDIH-STF",
    "firstName": "Nidhi",
    "lastName": "Naithani"
  },
  "brian.flanagan@websummit.com": {
    "email": "brian.flanagan@websummit.com",
    "bookingRef": "3AV7-STF",
    "firstName": "brian",
    "lastName": "flanagan"
  },
  "ian.curtis@websummit.com": {
    "email": "ian.curtis@websummit.com",
    "bookingRef": "T6WS-STF",
    "firstName": "Ian",
    "lastName": "Curtis"
  },
  "katarina.cierna@websummit.com": {
    "email": "katarina.cierna@websummit.com",
    "bookingRef": "CGMZ-STF",
    "firstName": "Katarina",
    "lastName": "Cierna"
  },
  "mark.powell@websummit.com": {
    "email": "mark.powell@websummit.com",
    "bookingRef": "PBJO-STF",
    "firstName": "Mark",
    "lastName": "Powell"
  },
  "aisling.flynn@websummit.com": {
    "email": "aisling.flynn@websummit.com",
    "bookingRef": "Y06S-STF",
    "firstName": "Aisling",
    "lastName": "Flynn"
  },
  "megan.sheridan@websummit.com": {
    "email": "megan.sheridan@websummit.com",
    "bookingRef": "HVME-STF",
    "firstName": "Megan",
    "lastName": "Sheridan"
  },
  "ciara.murnane@websummit.com": {
    "email": "ciara.murnane@websummit.com",
    "bookingRef": "KUVA-STF",
    "firstName": "Ciara",
    "lastName": "Murnane"
  },
  "thierry@websummit.com": {
    "email": "thierry@websummit.com",
    "bookingRef": "MRTY-STF",
    "firstName": "Thierry",
    "lastName": "Michel"
  },
  "jennifer.keogh@websummit.com": {
    "email": "jennifer.keogh@websummit.com",
    "bookingRef": "ECKJ-STF",
    "firstName": "Jennifer",
    "lastName": "Keogh"
  },
  "victor.jager@websummit.com": {
    "email": "victor.jager@websummit.com",
    "bookingRef": "OGVN-STF",
    "firstName": "Victor",
    "lastName": "Jager"
  },
  "lia.downer@websummit.com": {
    "email": "lia.downer@websummit.com",
    "bookingRef": "1VU1-STF",
    "firstName": "Lia",
    "lastName": "Downer"
  },
  "paul.butler@websummit.com": {
    "email": "paul.butler@websummit.com",
    "bookingRef": "LZIS-STF",
    "firstName": "Paul",
    "lastName": "Butler"
  },
  "rory.beirne@websummit.com": {
    "email": "rory.beirne@websummit.com",
    "bookingRef": "1CPS-STF",
    "firstName": "Rory",
    "lastName": "Beirne"
  },
  "sebastian.white@websummit.com": {
    "email": "sebastian.white@websummit.com",
    "bookingRef": "D7I7-STF",
    "firstName": "Sebastian",
    "lastName": "White"
  },
  "ronan.mooney@websummit.com": {
    "email": "ronan.mooney@websummit.com",
    "bookingRef": "XJ91-STF",
    "firstName": "Ronan",
    "lastName": "Mooney"
  },
  "eleanor@websummit.com": {
    "email": "eleanor@websummit.com",
    "bookingRef": "ON9Z-STF",
    "firstName": "Eleanor",
    "lastName": "McGrath"
  },
  "patrick.kelly@websummit.com": {
    "email": "patrick.kelly@websummit.com",
    "bookingRef": "CNMM-STF",
    "firstName": "Patrick",
    "lastName": "Kelly"
  },
  "patrice@websummit.com": {
    "email": "patrice@websummit.com",
    "bookingRef": "EQ2O-STF",
    "firstName": "Patrice",
    "lastName": "Finneran"
  },
  "claire.davis@websummit.com": {
    "email": "claire.davis@websummit.com",
    "bookingRef": "VZL9-STF",
    "firstName": "Claire",
    "lastName": "Davis"
  },
  "aoife.buckley@websummit.com": {
    "email": "aoife.buckley@websummit.com",
    "bookingRef": "6TLM-STF",
    "firstName": "Aoife",
    "lastName": "Buckley"
  },
  "tom@websummit.com": {
    "email": "tom@websummit.com",
    "bookingRef": "JQAH-STF",
    "firstName": "Tom",
    "lastName": "O'Reilly"
  },
  "ciara.ohanrahan@websummit.com": {
    "email": "ciara.ohanrahan@websummit.com",
    "bookingRef": "EASC-STF",
    "firstName": "Ciara",
    "lastName": "O'Hanrahan"
  },
  "eoin.ocarroll@websummit.com": {
    "email": "eoin.ocarroll@websummit.com",
    "bookingRef": "QPY7-STF",
    "firstName": "Eoin",
    "lastName": "O'Carroll"
  },
  "henry.obrien@websummit.com": {
    "email": "henry.obrien@websummit.com",
    "bookingRef": "CWE9-STF",
    "firstName": "Henry",
    "lastName": "O’ Brien"
  },
  "craig.obrien@websummit.com": {
    "email": "craig.obrien@websummit.com",
    "bookingRef": "MOUD-STF",
    "firstName": "Craig",
    "lastName": "O'Brien"
  },
  "jake.mulcahy@websummit.com": {
    "email": "jake.mulcahy@websummit.com",
    "bookingRef": "MC3J-STF",
    "firstName": "Jake",
    "lastName": "Mulcahy"
  },
  "jennifer.mcnaughton@websummit.com": {
    "email": "jennifer.mcnaughton@websummit.com",
    "bookingRef": "2A7M-STF",
    "firstName": "Jen",
    "lastName": "McNaughton"
  },
  "kevin.mcdonald@websummit.com": {
    "email": "kevin.mcdonald@websummit.com",
    "bookingRef": "X3RS-STF",
    "firstName": "Kevin",
    "lastName": "McDonald"
  },
  "patrick.griffith@websummit.com": {
    "email": "patrick.griffith@websummit.com",
    "bookingRef": "FXOA-STF",
    "firstName": "Patrick",
    "lastName": "Griffith"
  },
  "peterg@websummit.com": {
    "email": "peterg@websummit.com",
    "bookingRef": "BLSB-STF",
    "firstName": "Peter",
    "lastName": "Gilmer"
  },
  "micky.gangwani@websummit.com": {
    "email": "micky.gangwani@websummit.com",
    "bookingRef": "YEGX-STF",
    "firstName": "Micky",
    "lastName": "Gangwani"
  },
  "karl.fagan@websummit.com": {
    "email": "karl.fagan@websummit.com",
    "bookingRef": "BTGR-STF",
    "firstName": "Karl",
    "lastName": "Fagan"
  },
  "marie.degery@websummit.com": {
    "email": "marie.degery@websummit.com",
    "bookingRef": "I5JT-STF",
    "firstName": "Marie",
    "lastName": "Degery"
  },
  "grace.copeland@websummit.com": {
    "email": "grace.copeland@websummit.com",
    "bookingRef": "T0GF-STF",
    "firstName": "Grace",
    "lastName": "Copeland"
  },
  "clementine.baig@websummit.com": {
    "email": "clementine.baig@websummit.com",
    "bookingRef": "HT9P-STF",
    "firstName": "Clementine",
    "lastName": "Baig"
  },
  "nassim.amara@websummit.com": {
    "email": "nassim.amara@websummit.com",
    "bookingRef": "WQEW-STF",
    "firstName": "Nassim",
    "lastName": "Amara"
  },
  "janina.yotova@websummit.com": {
    "email": "janina.yotova@websummit.com",
    "bookingRef": "NJPN-STF",
    "firstName": "Janina",
    "lastName": "Yotova"
  },
  "suzanne.taylor@websummit.com": {
    "email": "suzanne.taylor@websummit.com",
    "bookingRef": "N5X1-STF",
    "firstName": "Suzanne",
    "lastName": "Taylor"
  },
  "rebecca.ryan@websummit.com": {
    "email": "rebecca.ryan@websummit.com",
    "bookingRef": "E1JI-STF",
    "firstName": "Rebecca",
    "lastName": "Ryan"
  },
  "allison@websummit.com": {
    "email": "allison@websummit.com",
    "bookingRef": "DMES-STF",
    "firstName": "Allison",
    "lastName": "Reilly"
  },
  "kristina@websummit.com": {
    "email": "kristina@websummit.com",
    "bookingRef": "FXZH-STF",
    "firstName": "Kristina",
    "lastName": "Neligan"
  },
  "rebecca.connolly@websummit.com": {
    "email": "rebecca.connolly@websummit.com",
    "bookingRef": "RSCN-STF",
    "firstName": "Rebecca",
    "lastName": "Connolly"
  },
  "gary.kelly@websummit.com": {
    "email": "gary.kelly@websummit.com",
    "bookingRef": "6WEC-STF",
    "firstName": "Gary",
    "lastName": "Kelly"
  },
  "caoimhe.hurley@websummit.com": {
    "email": "caoimhe.hurley@websummit.com",
    "bookingRef": "DHNY-STF",
    "firstName": "Caoimhe",
    "lastName": "Hurley"
  },
  "elaine.hanly@websummit.com": {
    "email": "elaine.hanly@websummit.com",
    "bookingRef": "BI3X-STF",
    "firstName": "Elaine",
    "lastName": "Hanly"
  },
  "aaron.campbell@websummit.com": {
    "email": "aaron.campbell@websummit.com",
    "bookingRef": "QSWY-STF",
    "firstName": "Aaron",
    "lastName": "Campbell"
  },
  "conor.buggle@websummit.com": {
    "email": "conor.buggle@websummit.com",
    "bookingRef": "LHDA-STF",
    "firstName": "Conor",
    "lastName": "Buggle"
  },
  "eugene.kazaev@websummit.com": {
    "email": "eugene.kazaev@websummit.com",
    "bookingRef": "XJSM-STF",
    "firstName": "Eugene",
    "lastName": "Kazaev"
  },
  "dino.bikic@websummit.com": {
    "email": "dino.bikic@websummit.com",
    "bookingRef": "G8C1-STF",
    "firstName": "Dino",
    "lastName": "Bikic"
  },
  "lingyu.zhang@websummit.com": {
    "email": "lingyu.zhang@websummit.com",
    "bookingRef": "21RP-STF",
    "firstName": "Lingyu",
    "lastName": "Zhang"
  },
  "haziq.zargar@websummit.com": {
    "email": "haziq.zargar@websummit.com",
    "bookingRef": "VR42-STF",
    "firstName": "Haziq",
    "lastName": "Zargar"
  },
  "stephen@websummit.com": {
    "email": "stephen@websummit.com",
    "bookingRef": "VASR-STF",
    "firstName": "Stephen",
    "lastName": "Twomey"
  },
  "clarissa.schirosi@websummit.com": {
    "email": "clarissa.schirosi@websummit.com",
    "bookingRef": "Q44G-STF",
    "firstName": "Clarissa",
    "lastName": "Schirosi"
  },
  "shauna.kiely@websummit.com": {
    "email": "shauna.kiely@websummit.com",
    "bookingRef": "94XH-STF",
    "firstName": "Shauna",
    "lastName": "Kiely"
  },
  "mary.kavanagh@websummit.com": {
    "email": "mary.kavanagh@websummit.com",
    "bookingRef": "4UVX-STF",
    "firstName": "Mary",
    "lastName": "Kavanagh"
  },
  "donal.donovan@websummit.com": {
    "email": "donal.donovan@websummit.com",
    "bookingRef": "T8LT-STF",
    "firstName": "Donal",
    "lastName": "Donovan"
  },
  "lisa.armstrongbowles@websummit.com": {
    "email": "lisa.armstrongbowles@websummit.com",
    "bookingRef": "W4EY-STF",
    "firstName": "Lisa",
    "lastName": "Armstrong Bowles"
  },
  "sarahjane.allen@websummit.com": {
    "email": "sarahjane.allen@websummit.com",
    "bookingRef": "1Q5P-STF",
    "firstName": "Sarah Jane",
    "lastName": "Allen"
  },
  "lauren.omahony@websummit.com": {
    "email": "lauren.omahony@websummit.com",
    "bookingRef": "YWYS-STF",
    "firstName": "Lauren",
    "lastName": "O'Mahony"
  },
  "anna@websummit.com": {
    "email": "anna@websummit.com",
    "bookingRef": "SFLD-STF",
    "firstName": "Anna",
    "lastName": "O'Hare"
  },
  "niamh.oconnor@websummit.com": {
    "email": "niamh.oconnor@websummit.com",
    "bookingRef": "BI4B-STF",
    "firstName": "Niamh",
    "lastName": "O'Connor"
  },
  "emma.murphy@websummit.com": {
    "email": "emma.murphy@websummit.com",
    "bookingRef": "BTWY-STF",
    "firstName": "Emma",
    "lastName": "Murphy"
  },
  "maeve.mcquillan@websummit.com": {
    "email": "maeve.mcquillan@websummit.com",
    "bookingRef": "DDE0-STF",
    "firstName": "Maeve",
    "lastName": "McQuillan"
  },
  "gabriela.guedez@websummit.com": {
    "email": "gabriela.guedez@websummit.com",
    "bookingRef": "UOE6-STF",
    "firstName": "Gabriela",
    "lastName": "Guedez"
  },
  "lee.campbell@websummit.com": {
    "email": "lee.campbell@websummit.com",
    "bookingRef": "INBL-STF",
    "firstName": "Lee",
    "lastName": "Campbell"
  },
  "robert.babos@websummit.com": {
    "email": "robert.babos@websummit.com",
    "bookingRef": "27GV-STF",
    "firstName": "Rob",
    "lastName": "Babos"
  },
  "abbey.adkins@websummit.com": {
    "email": "abbey.adkins@websummit.com",
    "bookingRef": "PWMK-STF",
    "firstName": "Abbey",
    "lastName": "Adkins"
  },
  "ronan.yore@websummit.com": {
    "email": "ronan.yore@websummit.com",
    "bookingRef": "0GUP-STF",
    "firstName": "Ronan",
    "lastName": "Yore"
  },
  "mark.teeple@websummit.com": {
    "email": "mark.teeple@websummit.com",
    "bookingRef": "NW4M-STF",
    "firstName": "Mark",
    "lastName": "Teeple"
  },
  "luke.prendeville@websummit.com": {
    "email": "luke.prendeville@websummit.com",
    "bookingRef": "888Q-STF",
    "firstName": "Luke",
    "lastName": "Prendeville"
  },
  "zara.mcgrath@websummit.com": {
    "email": "zara.mcgrath@websummit.com",
    "bookingRef": "YK86-STF",
    "firstName": "Zara",
    "lastName": "McGrath"
  },
  "sine.mcgoff@websummit.com": {
    "email": "sine.mcgoff@websummit.com",
    "bookingRef": "U47T-STF",
    "firstName": "Síne",
    "lastName": "McGoff"
  },
  "gintare@websummit.com": {
    "email": "gintare@websummit.com",
    "bookingRef": "M2LG-STF",
    "firstName": "Gintare",
    "lastName": "Karalyte"
  },
  "edel.hynes@websummit.com": {
    "email": "edel.hynes@websummit.com",
    "bookingRef": "LC8O-STF",
    "firstName": "Edel",
    "lastName": "Hynes"
  },
  "ciaran.hope@websummit.com": {
    "email": "ciaran.hope@websummit.com",
    "bookingRef": "AHFH-STF",
    "firstName": "Ciaran",
    "lastName": "Hope"
  },
  "wez.evans@websummit.com": {
    "email": "wez.evans@websummit.com",
    "bookingRef": "TGBR-STF",
    "firstName": "Wez",
    "lastName": "Evans"
  },
  "john.downey@websummit.com": {
    "email": "john.downey@websummit.com",
    "bookingRef": "5YQU-STF",
    "firstName": "John",
    "lastName": "Downey"
  },
  "eamon.defreitas@websummit.com": {
    "email": "eamon.defreitas@websummit.com",
    "bookingRef": "889B-STF",
    "firstName": "Eamon",
    "lastName": "de Freitas"
  },
  "craig.becker@websummit.com": {
    "email": "craig.becker@websummit.com",
    "bookingRef": "HHB5-STF",
    "firstName": "Craig",
    "lastName": "Becker"
  },
  "ines.azevedo@websummit.com": {
    "email": "ines.azevedo@websummit.com",
    "bookingRef": "QUFN-STF",
    "firstName": "Inês",
    "lastName": "Azevedo"
  },
  "amanda.egan@websummit.com": {
    "email": "amanda.egan@websummit.com",
    "bookingRef": "A0YB-STF",
    "firstName": "Amanda",
    "lastName": "Egan"
  },
  "arianne.cruz@websummit.com": {
    "email": "arianne.cruz@websummit.com",
    "bookingRef": "M58M-STF",
    "firstName": "Arianne",
    "lastName": "Cruz"
  },
  "sarah.coffey@websummit.com": {
    "email": "sarah.coffey@websummit.com",
    "bookingRef": "VMIR-STF",
    "firstName": "Sarah",
    "lastName": "Coffey"
  },
  "geoff.wharton@websummit.com": {
    "email": "geoff.wharton@websummit.com",
    "bookingRef": "O1R2-STF",
    "firstName": "Geoffrey",
    "lastName": "Wharton"
  },
  "eoin.sheehan@websummit.com": {
    "email": "eoin.sheehan@websummit.com",
    "bookingRef": "GLW1-STF",
    "firstName": "Eoin",
    "lastName": "Sheehan"
  },
  "alex.mackenzie@websummit.com": {
    "email": "alex.mackenzie@websummit.com",
    "bookingRef": "CCWK-STF",
    "firstName": "Alex",
    "lastName": "Mackenzie"
  },
  "robert.lynch@websummit.com": {
    "email": "robert.lynch@websummit.com",
    "bookingRef": "5BL4-STF",
    "firstName": "Robert",
    "lastName": "Lynch"
  },
  "james.lenihan@websummit.com": {
    "email": "james.lenihan@websummit.com",
    "bookingRef": "FULN-STF",
    "firstName": "James",
    "lastName": "Lenihan"
  },
  "adam.fleming@websummit.com": {
    "email": "adam.fleming@websummit.com",
    "bookingRef": "8BCC-STF",
    "firstName": "Adam",
    "lastName": "Fleming"
  },
  "konrad.timon@websummit.com": {
    "email": "konrad.timon@websummit.com",
    "bookingRef": "QMQW-STF",
    "firstName": "Konrad",
    "lastName": "Timon"
  },
  "barry@websummit.com": {
    "email": "barry@websummit.com",
    "bookingRef": "EVEP-STF",
    "firstName": "Barry",
    "lastName": "McCullagh"
  },
  "michael.whelan@websummit.com": {
    "email": "michael.whelan@websummit.com",
    "bookingRef": "FEPQ-STF",
    "firstName": "Mike",
    "lastName": "Whelan"
  },
  "charlie.mullen@websummit.com": {
    "email": "charlie.mullen@websummit.com",
    "bookingRef": "MLGZ-STF",
    "firstName": "Charlie",
    "lastName": "Mullen"
  },
  "elaine.watts@websummit.com": {
    "email": "elaine.watts@websummit.com",
    "bookingRef": "586A-STF",
    "firstName": "Elaine",
    "lastName": "Watts"
  },
  "francesca.viterbo@websummit.com": {
    "email": "francesca.viterbo@websummit.com",
    "bookingRef": "8ZHV-STF",
    "firstName": "Francesca",
    "lastName": "Viterbo"
  },
  "anne@websummit.com": {
    "email": "anne@websummit.com",
    "bookingRef": "HECV-STF",
    "firstName": "Anne",
    "lastName": "O'Leary"
  },
  "laoise.odwyer@websummit.com": {
    "email": "laoise.odwyer@websummit.com",
    "bookingRef": "MHJ5-STF",
    "firstName": "Laoise",
    "lastName": "O'Dwyer"
  },
  "paul.moore@websummit.com": {
    "email": "paul.moore@websummit.com",
    "bookingRef": "F6XN-STF",
    "firstName": "Paul",
    "lastName": "Anthony Moore"
  },
  "trevor@websummit.com": {
    "email": "trevor@websummit.com",
    "bookingRef": "LRDG-STF",
    "firstName": "Trevor",
    "lastName": "Merrey"
  },
  "mark.mcgann@websummit.com": {
    "email": "mark.mcgann@websummit.com",
    "bookingRef": "UD5E-STF",
    "firstName": "Mark",
    "lastName": "McGann"
  },
  "kerry.mcdevitt@websummit.com": {
    "email": "kerry.mcdevitt@websummit.com",
    "bookingRef": "PO76-STF",
    "firstName": "Kerry",
    "lastName": "Mc.Devitt"
  },
  "colin@websummit.com": {
    "email": "colin@websummit.com",
    "bookingRef": "V5EX-STF",
    "firstName": "Colin",
    "lastName": "McAvoy"
  },
  "aine.madden@websummit.com": {
    "email": "aine.madden@websummit.com",
    "bookingRef": "K9WA-STF",
    "firstName": "Áine",
    "lastName": "Madden"
  },
  "raxitpaul.louis@websummit.com": {
    "email": "raxitpaul.louis@websummit.com",
    "bookingRef": "N5SC-STF",
    "firstName": "Raxit Paul",
    "lastName": "Louis"
  },
  "carmel@websummit.com": {
    "email": "carmel@websummit.com",
    "bookingRef": "FCNO-STF",
    "firstName": "Carmel",
    "lastName": "Lee"
  },
  "patrick.kirwan@websummit.com": {
    "email": "patrick.kirwan@websummit.com",
    "bookingRef": "VCHZ-STF",
    "firstName": "Paddy",
    "lastName": "Kirwan"
  },
  "adam.connon@websummit.com": {
    "email": "adam.connon@websummit.com",
    "bookingRef": "M6PW-STF",
    "firstName": "Adam",
    "lastName": "Connon"
  },
  "aoife.brew@websummit.com": {
    "email": "aoife.brew@websummit.com",
    "bookingRef": "5XZI-STF",
    "firstName": "Aoife",
    "lastName": "Brew"
  },
  "liyuan.ma@websummit.com": {
    "email": "liyuan.ma@websummit.com",
    "bookingRef": "RIQW-STF",
    "firstName": "Liyuan",
    "lastName": "Ma"
  },
  "niall.khoaz@websummit.com": {
    "email": "niall.khoaz@websummit.com",
    "bookingRef": "4C9P-STF",
    "firstName": "Niall",
    "lastName": "Khoaz"
  },
  "lisa@websummit.com": {
    "email": "lisa@websummit.com",
    "bookingRef": "3VQF-STF",
    "firstName": "Lisa",
    "lastName": "Gallagher"
  },
  "rachel.wheeler@websummit.com": {
    "email": "rachel.wheeler@websummit.com",
    "bookingRef": "QNBO-STF",
    "firstName": "Rachel Wheeler",
    "lastName": "(She / Her)"
  },
  "karena.walshe@websummit.com": {
    "email": "karena.walshe@websummit.com",
    "bookingRef": "D25K-STF",
    "firstName": "Karena",
    "lastName": "Walshe"
  },
  "cathal.walsh@websummit.com": {
    "email": "cathal.walsh@websummit.com",
    "bookingRef": "UMOM-STF",
    "firstName": "Cathal",
    "lastName": "Walsh"
  },
  "mirella.vanbalen@websummit.com": {
    "email": "mirella.vanbalen@websummit.com",
    "bookingRef": "0O30-STF",
    "firstName": "Mirella",
    "lastName": "Van Balen"
  },
  "aoileann@websummit.com": {
    "email": "aoileann@websummit.com",
    "bookingRef": "QPEG-STF",
    "firstName": "Aoileann",
    "lastName": "Ni Chuilleanáin"
  },
  "michael.harnett@websummit.com": {
    "email": "michael.harnett@websummit.com",
    "bookingRef": "CEOO-STF",
    "firstName": "Michael",
    "lastName": "Harnett"
  },
  "finian.green@websummit.com": {
    "email": "finian.green@websummit.com",
    "bookingRef": "CRBP-STF",
    "firstName": "Finian",
    "lastName": "Green"
  },
  "nida@websummit.com": {
    "email": "nida@websummit.com",
    "bookingRef": "DJPF-STF",
    "firstName": "Nida",
    "lastName": "Shah"
  },
  "mike@websummit.com": {
    "email": "mike@websummit.com",
    "bookingRef": "WPF7-STF",
    "firstName": "Mike",
    "lastName": "Sexton"
  },
  "artur.pereira@websummit.com": {
    "email": "artur.pereira@websummit.com",
    "bookingRef": "J6ZJ-STF",
    "firstName": "Artur",
    "lastName": "Pereira"
  },
  "david@websummit.com": {
    "email": "david@websummit.com",
    "bookingRef": "L9YJ-STF",
    "firstName": "David",
    "lastName": "Kelly"
  },
  "luca.viola@websummit.com": {
    "email": "luca.viola@websummit.com",
    "bookingRef": "C571-STF",
    "firstName": "Luca",
    "lastName": "Viola"
  },
  "tomislav.svecak@websummit.com": {
    "email": "tomislav.svecak@websummit.com",
    "bookingRef": "GZM8-STF",
    "firstName": "Tomislav",
    "lastName": "Svecak"
  },
  "joao.soares@websummit.com": {
    "email": "joao.soares@websummit.com",
    "bookingRef": "JOAO-STF",
    "firstName": "João",
    "lastName": "Soares"
  },
  "tomasz.rdzak@websummit.com": {
    "email": "tomasz.rdzak@websummit.com",
    "bookingRef": "N6AN-STFY",
    "firstName": "Tomasz",
    "lastName": "Rdzak"
  },
  "thomas.moen@websummit.com": {
    "email": "thomas.moen@websummit.com",
    "bookingRef": "GJU6-STF",
    "firstName": "Thomas",
    "lastName": "Moen"
  },
  "joan.mccarthy@websummit.com": {
    "email": "joan.mccarthy@websummit.com",
    "bookingRef": "NOMX-STF",
    "firstName": "Joan",
    "lastName": "McCarthy"
  },
  "dylan@websummit.com": {
    "email": "dylan@websummit.com",
    "bookingRef": "RAKW-STF",
    "firstName": "Dylan",
    "lastName": "Kelly"
  },
  "gabriel.karasekgageiro@websummit.com": {
    "email": "gabriel.karasekgageiro@websummit.com",
    "bookingRef": "PJ4W-STF",
    "firstName": "Gabriel",
    "lastName": "Karasek"
  },
  "roberto.decurnex@websummit.com": {
    "email": "roberto.decurnex@websummit.com",
    "bookingRef": "IAE6-STF",
    "firstName": "Roberto",
    "lastName": "Decurnex"
  },
  "ciaran.curley@websummit.com": {
    "email": "ciaran.curley@websummit.com",
    "bookingRef": "WVJU-STF",
    "firstName": "Ciarán",
    "lastName": "Curley"
  },
  "conor.broderick@websummit.com": {
    "email": "conor.broderick@websummit.com",
    "bookingRef": "57G2-STF",
    "firstName": "Conor",
    "lastName": "Broderick"
  },
  "paul.omahony@websummit.com": {
    "email": "paul.omahony@websummit.com",
    "bookingRef": "K9TM-STF",
    "firstName": "Paul",
    "lastName": "O'Mahony"
  },
  "hannah.large@websummit.com": {
    "email": "hannah.large@websummit.com",
    "bookingRef": "8CBP-STF",
    "firstName": "Hannah",
    "lastName": "Large"
  },
  "ary.blue@websummit.com": {
    "email": "ary.blue@websummit.com",
    "bookingRef": "DP70-STF",
    "firstName": "Ary",
    "lastName": "Blue"
  },
  "dylan.hodge@websummit.com": {
    "email": "dylan.hodge@websummit.com",
    "bookingRef": "Z28J-STF",
    "firstName": "Dylan",
    "lastName": "Hodge"
  },
  "chloe.hines@websummit.com": {
    "email": "chloe.hines@websummit.com",
    "bookingRef": "ZNPH-STF",
    "firstName": "Chloe",
    "lastName": "Hines"
  },
  "dargan@websummit.com": {
    "email": "dargan@websummit.com",
    "bookingRef": "GTNX-STF",
    "firstName": "Dargan",
    "lastName": "Crowley Long"
  },
  "conor.claffey@websummit.com": {
    "email": "conor.claffey@websummit.com",
    "bookingRef": "HJLK-STF",
    "firstName": "Conor",
    "lastName": "Claffey"
  },
  "steven@websummit.com": {
    "email": "steven@websummit.com",
    "bookingRef": "DDYZ-STF",
    "firstName": "Steven",
    "lastName": "Tobin"
  },
  "aaron.meagher@websummit.com": {
    "email": "aaron.meagher@websummit.com",
    "bookingRef": "SZAP-STF",
    "firstName": "Aaron",
    "lastName": "Meagher"
  },
  "georgios.lamprou@websummit.com": {
    "email": "georgios.lamprou@websummit.com",
    "bookingRef": "SI44-STF",
    "firstName": "Georgios",
    "lastName": "Lamprou"
  },
  "ricardo.pinto@websummit.com": {
    "email": "ricardo.pinto@websummit.com",
    "bookingRef": "VGBM-STF",
    "firstName": "Ricardo",
    "lastName": "Gandara Pinto"
  },
  "ines.cruz@websummit.com": {
    "email": "ines.cruz@websummit.com",
    "bookingRef": "603G-STF",
    "firstName": "Inês",
    "lastName": "Cruz"
  },
  "johannes.vollertsen@websummit.com": {
    "email": "johannes.vollertsen@websummit.com",
    "bookingRef": "FGH0-STF",
    "firstName": "Johannes",
    "lastName": "Vollertsen"
  },
  "kirsty.tobin@websummit.com": {
    "email": "kirsty.tobin@websummit.com",
    "bookingRef": "AO3N-STF",
    "firstName": "Kirsty",
    "lastName": "Tobin"
  },
  "greta.taylor@websummit.com": {
    "email": "greta.taylor@websummit.com",
    "bookingRef": "NZ3Z-STF",
    "firstName": "Greta",
    "lastName": "Taylor"
  },
  "ciaran.bruder@websummit.com": {
    "email": "ciaran.bruder@websummit.com",
    "bookingRef": "IWL8-STF",
    "firstName": "Ciaran",
    "lastName": "Bruder"
  },
  "rob.reid@websummit.com": {
    "email": "rob.reid@websummit.com",
    "bookingRef": "C74F-STF",
    "firstName": "Rob",
    "lastName": "Reid"
  },
  "allyson.doyle@websummit.com": {
    "email": "allyson.doyle@websummit.com",
    "bookingRef": "YDBP-STF",
    "firstName": "Ally",
    "lastName": "Doyle"
  },
  "carolyn.quinlan@websummit.com": {
    "email": "carolyn.quinlan@websummit.com",
    "bookingRef": "TKIJ-STF",
    "firstName": "Carolyn",
    "lastName": "Quinlan"
  },
  "katie.bolger@websummit.com": {
    "email": "katie.bolger@websummit.com",
    "bookingRef": "TOVZ-STF",
    "firstName": "Katie",
    "lastName": "Bolger"
  },
  "antonio.nevescosta@websummit.com": {
    "email": "antonio.nevescosta@websummit.com",
    "bookingRef": "UMO1-STF",
    "firstName": "Antonio",
    "lastName": "Neves Costa"
  },
  "katherine.farrell@websummit.com": {
    "email": "katherine.farrell@websummit.com",
    "bookingRef": "OXCC-STF",
    "firstName": "Katherine",
    "lastName": "Farrell"
  },
  "sunil.sharma@websummit.com": {
    "email": "sunil.sharma@websummit.com",
    "bookingRef": "SHOA-STF",
    "firstName": "Sunil",
    "lastName": "Sharma"
  },
  "casey@riseconf.com": {
    "email": "casey@riseconf.com",
    "bookingRef": "J5UP-STF",
    "firstName": "Casey",
    "lastName": "Lau"
  },
  "jenny.odonoghue@websummit.com": {
    "email": "jenny.odonoghue@websummit.com",
    "bookingRef": "IOUL-STF",
    "firstName": "Jenny",
    "lastName": "O'Donoghue"
  },
  "chris@websummit.com": {
    "email": "chris@websummit.com",
    "bookingRef": "L8PN-STF",
    "firstName": "Chris",
    "lastName": "Murphy"
  },
  "eoghan@websummit.com": {
    "email": "eoghan@websummit.com",
    "bookingRef": "J4XS-STF",
    "firstName": "Eoghan",
    "lastName": "McNeill"
  },
  "renee.daly@websummit.com": {
    "email": "renee.daly@websummit.com",
    "bookingRef": "C8CH-STF",
    "firstName": "Renee",
    "lastName": "Daly"
  },
  "katarzyna.matusiak@websummit.com": {
    "email": "katarzyna.matusiak@websummit.com",
    "bookingRef": "EEQ1-STF",
    "firstName": "Katarzyna",
    "lastName": "Matusiak"
  },
  "david.jordan@websummit.com": {
    "email": "david.jordan@websummit.com",
    "bookingRef": "1OIV-STF",
    "firstName": "David",
    "lastName": "Jordan"
  },
  "luke.byrne@websummit.com": {
    "email": "luke.byrne@websummit.com",
    "bookingRef": "3ZWS-STF",
    "firstName": "Luke",
    "lastName": "Byrne"
  },
  "edel.prendergast@websummit.com": {
    "email": "edel.prendergast@websummit.com",
    "bookingRef": "8KWF-STF",
    "firstName": "Edel",
    "lastName": "Prendergast"
  },
  "dave.kenny@websummit.com": {
    "email": "dave.kenny@websummit.com",
    "bookingRef": "XOOC-STF",
    "firstName": "Dave",
    "lastName": "Kenny"
  },
  "eadaoin.fitzmaurice@websummit.com": {
    "email": "eadaoin.fitzmaurice@websummit.com",
    "bookingRef": "8ORN-STF",
    "firstName": "Éadaoin",
    "lastName": "Fitzmaurice"
  },
  "sylviane.coquard@websummit.com": {
    "email": "sylviane.coquard@websummit.com",
    "bookingRef": "JXDR-STF",
    "firstName": "Sylviane",
    "lastName": "Coquard"
  },
  "lorna.coakley@websummit.com": {
    "email": "lorna.coakley@websummit.com",
    "bookingRef": "7PI2-STF",
    "firstName": "Lorna",
    "lastName": "Coakley"
  },
  "marija.citic@websummit.com": {
    "email": "marija.citic@websummit.com",
    "bookingRef": "2YGS-STF",
    "firstName": "Marija",
    "lastName": "Citic"
  },
  "campbell.lee@websummit.com": {
    "email": "campbell.lee@websummit.com",
    "bookingRef": "YTUM-STF",
    "firstName": "Lee",
    "lastName": "Campbell"
  },
  "artem.ankudovich@websummit.com": {
    "email": "artem.ankudovich@websummit.com",
    "bookingRef": "CPLO-STF",
    "firstName": "Artem",
    "lastName": "Ankudovich"
  },
  "beth.dinsmore@websummit.com": {
    "email": "beth.dinsmore@websummit.com",
    "bookingRef": "M556-STF",
    "firstName": "Elizabeth",
    "lastName": "Dinsmore"
  },
  "alex.anikeev@websummit.com": {
    "email": "alex.anikeev@websummit.com",
    "bookingRef": "0ORY-STF",
    "firstName": "Alexander",
    "lastName": "Anikeev"
  },
  "luis.serralheiro@websummit.com": {
    "email": "luis.serralheiro@websummit.com",
    "bookingRef": "W78E-STF",
    "firstName": "Luis",
    "lastName": "Serralheiro"
  },
  "tim.kiernan@websummit.com": {
    "email": "tim.kiernan@websummit.com",
    "bookingRef": "EOTW-STF",
    "firstName": "Tim",
    "lastName": "Kiernan"
  },
  "keeva.bentham@websummit.com": {
    "email": "keeva.bentham@websummit.com",
    "bookingRef": "CT0C-STF",
    "firstName": "Keeva",
    "lastName": "Bentham"
  },
  "thomas.moen+test@websummit.com": {
    "email": "thomas.moen+test@websummit.com",
    "bookingRef": "J3UB-STF",
    "firstName": "Thomas",
    "lastName": "Test Moen"
  },
  "kat@websummit.com": {
    "email": "kat@websummit.com",
    "bookingRef": "V6HD-STF",
    "firstName": "Katarina",
    "lastName": "Black"
  },
  "alexandra.silva@websummit.com": {
    "email": "alexandra.silva@websummit.com",
    "bookingRef": "YI98-STF",
    "firstName": "Alexandra",
    "lastName": "Silva"
  },
  "marek.parafianowicz@websummit.com": {
    "email": "marek.parafianowicz@websummit.com",
    "bookingRef": "FHOD-STF",
    "firstName": "Marek",
    "lastName": "Parafianowicz"
  },
  "paddy@websummit.com": {
    "email": "paddy@websummit.com",
    "bookingRef": "WACD-STF",
    "firstName": "Paddy",
    "lastName": "Cosgrave"
  },
  "pm@amaranthine.com": {
    "email": "pm@amaranthine.com",
    "bookingRef": "MD0M-STF",
    "firstName": "Patrick",
    "lastName": "Murphy"
  },
  "tom.svecak@websummit.com": {
    "email": "tom.svecak@websummit.com",
    "bookingRef": "CPX0-STF",
    "firstName": "Tom",
    "lastName": "Svecak"
  },
  "angelika.kosiorek+4@netguru.com": {
    "email": "angelika.kosiorek+4@netguru.com",
    "bookingRef": "DSQ3-STF",
    "firstName": "Marta",
    "lastName": "Gras (test conf - STAFF)"
  },
  "angelika.kosiorek+2@netguru.com": {
    "email": "angelika.kosiorek+2@netguru.com",
    "bookingRef": "GL0X-STF",
    "firstName": "Maria",
    "lastName": "Kos (test conf - STAFF)"
  },
  "martyna.kupidura+t3@netguru.com": {
    "email": "martyna.kupidura+t3@netguru.com",
    "bookingRef": "UNLY-STF",
    "firstName": "Martyna",
    "lastName": "Kowalska (staff for now, convert to an attendee later)"
  },
  "angelika.kosiorek+1@netguru.com": {
    "email": "angelika.kosiorek+1@netguru.com",
    "bookingRef": "96CF-STF",
    "firstName": "Angelika",
    "lastName": "Kosiorek"
  },
  "conor.buggle@cilabs.com": {
    "email": "conor.buggle@cilabs.com",
    "bookingRef": "1GCB-STF",
    "firstName": "Conor",
    "lastName": "Buggle"
  },
  "allison@cilabs.com": {
    "email": "allison@cilabs.com",
    "bookingRef": "SBN4-STF",
    "firstName": "Allisson",
    "lastName": "Reilly"
  },
  "nuno.ramao@websummit.com": {
    "email": "nuno.ramao@websummit.com",
    "bookingRef": "K2YJ-STF",
    "firstName": "Nuno",
    "lastName": "Ramāo"
  }
}

const sandbox_ws20: Conference = {
  slug: 'ws20',
  storeId: '22d0f54a-35ef-4dcc-a2b3-1e6c8f99a41f',
  staffProductId: '56ba3c20-ee93-4aa7-8400-2ffc22f36a92',
  guestProductId: '65e53977-9efa-4937-bdf7-340a8a131862',
}

const sandbox_tfh20: Conference = {
  slug: 'tfh20',
  storeId: '7ada51b5-eed4-44f9-852c-9ef5b20e16a1',
  staffProductId: 'daa9e08b-409c-4ce2-9c45-f220d33101c1'
}

const prod_cc21: Conference = {
  slug: 'cc21',
  storeId: '32d6f737-1ce9-4ac1-9c23-8e4668292268',
  staffProductId: '6c607f74-d375-48ae-a705-97035e494c96'
}

const prod_tfh20: Conference = {
  slug: 'tfh20',
  storeId: 'd4bd55f7-b8f5-44f3-a458-4c1609a42588',
  staffProductId: 'b4cb4ae6-bd23-4714-b98a-d00d6eced94a'
}

const sandboxApiUrl = process.env.SANDBOX_API_URL;
const sandboxToken = process.env.SANDBOX_STORES_TOKEN;
const prodApiUrl = process.env.PRODUCTION_API_URL;
const prodToken = process.env.PRODUCTION_STORES_TOKEN;

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => (
    <App {...props}
         token={sandboxToken}
         staffList={staffList}
         conference={sandbox_tfh20}
         apiURL={sandboxApiUrl}
    />
  )
})

export const { bootstrap, mount, unmount, update } = lifecycles
