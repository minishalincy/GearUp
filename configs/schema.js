import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable('carListing', {
    id: serial('id').primaryKey(),
    listingTitle: varchar('listingTitle').notNull(),
    tagline: varchar('tagline'),
    originalPrice: varchar("originalPrice"),
    sellingPrice: varchar("sellingPrice").notNull(),
    category: varchar("category").notNull(),
    condition: varchar("condition").notNull(),
    make: varchar("make").notNull(),
    model: varchar("model").notNull(),
    year: varchar("year").notNull(),
    driveType: varchar("driveType").notNull(),
    transmission: varchar("transmission").notNull(),
    fuelType: varchar("fuelType").notNull(),
    mileage: varchar("mileage").notNull(),
    engineSize: varchar("engineSize"),
    cylinder: varchar("cylinder"),
    color: varchar("color").notNull(),
    door: varchar("door").notNull(),
    vin: varchar("vin"),
    offerType: varchar("offerType"),
    listingDescription: varchar("listingDescription").notNull(),
    features:json('features'),
    createdBy:varchar('createdBy').notNull().default('minishalincy123@gmail.com'),
    userName:varchar('userName').notNull().default('minilincy'),
    userImageUrl:varchar('userImageUrl').default('https://cdn.motor1.com/images/mgl/qkZG0G/s1/spofec-programm-fur-den-rolls-royce-phantom-series-ii.jpg'),
    postedOn:varchar('postedOn')
})


export const CarImages=pgTable('carImages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('imageUrl').notNull(),
    carListingId:integer('carListingId').notNull().references(()=>CarListing.id)
})