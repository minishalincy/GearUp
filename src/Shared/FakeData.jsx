import { faker } from '@faker-js/faker';

function createRandomCarList(){
    return {
        name:faker.vehicle.vehicle(),
        fuelType:faker.vehicle.fuel(),
        model:faker.vehicle.model(),
        type:faker.vehicle.type(),
        
        image:'https://www.carsjade.com/wp-content/uploads/2023/05/2025-BMW-i8-For-Sale.png',
        miles:1000,
        gearType:'Automatic',
        price:faker.finance.amount({min:4000 , max:200000})
    }
}

const carList = faker.helpers.multiple(createRandomCarList,{
    count:7
})

export default{
    carList
}