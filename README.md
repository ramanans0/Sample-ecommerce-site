This is a sample ecommerce-admin site, designed in next.js

I used next.js because it integrates the MERN stack in a way that makes it efficient to design apps like this, that can quickly interface with a database and adjust information on the fly. I used mongoDb for the caching of data, due to the need for an efficient key/value store while fetching and editing data. This is because the final ecommerce site will be very read heavy with very simple fetch needs, and the columns needed for each product may vary greatly in the future, so a flexible design will make scaling easier. Every product has unique characteristics that need to be taken into account, and NoSQL can accomodate that far more efficiently.

I used javascript due to its robust frameworks via Node and Express making certain aspects of development much simpler. I used tailwind css for the styling, because it's very fast, and an admin panel needs far less in the way of heavily custom css. Instead, fast form response is a far higher priority.

This design is intended to be hosted on the cloud, where the horizontal scaling will make it very flexible and resistant to load.