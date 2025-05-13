import { faker } from '@faker-js/faker/locale/pt_BR';
import lodash from 'lodash';
import fs from 'fs';

const peoples = lodash.times(550, function(n){
    const firtName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        id: n+1,
        firtName: firtName,
        lastName: lastName,
        avatar: faker.image.avatar(),
        address: faker.location.streetAddress(),
        email: faker.internet.email({ firstName: firtName.toLowerCase, lastName: lastName.toLowerCase }),   
    }
});

const data = {};
data.peoples = peoples;
fs.writeFile('db.json', JSON.stringify(data), (err) => {
    if(err) throw err;
    console.log('Finalizado...');
});