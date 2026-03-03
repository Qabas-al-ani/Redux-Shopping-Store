const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Toilet Paper',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Handmade Soap',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Set of Wooden Spoons',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Camera',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Tablet',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Tales at Bedtime',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Alphabet Blocks',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'alphabet-blocks.jpg',
      price: 9.99,
      quantity: 600
    },
    // Additional Food
    {
      name: 'Extra Virgin Olive Oil',
      description: 'Premium cold-pressed olive oil, 500ml. Perfect for dressings, cooking, and dipping. Sourced from Mediterranean groves.',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      category: categories[0]._id,
      price: 12.99,
      quantity: 80
    },
    {
      name: 'Organic Honey Jar',
      description: 'Pure raw honey, 340g. No additives. Ideal for tea, baking, and natural sweetness. From trusted beekeepers.',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
      category: categories[0]._id,
      price: 8.99,
      quantity: 120
    },
    {
      name: 'Italian Pasta Pack',
      description: 'Premium durum wheat pasta, 500g. Classic spaghetti shape. Cooks al dente in 9 minutes. Perfect for family dinners.',
      image: 'https://images.unsplash.com/photo-1551183053-bf0a2d0c4b9d?w=400',
      category: categories[0]._id,
      price: 3.49,
      quantity: 200
    },
    {
      name: 'Herbal Tea Collection',
      description: 'Assorted caffeine-free herbal teas, 20 bags. Chamomile, peppermint, and ginger. Relaxing and refreshing.',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d5c530?w=400',
      category: categories[0]._id,
      price: 5.99,
      quantity: 150
    },
    {
      name: 'Granola Clusters',
      description: 'Crunchy oat granola with nuts and honey, 400g. Great with yogurt or milk. No artificial flavors.',
      image: 'https://images.unsplash.com/photo-1517686469429-8b58361b2d0e?w=400',
      category: categories[0]._id,
      price: 6.49,
      quantity: 90
    },
    // Additional Household Supplies
    {
      name: 'Paper Towels 6-Pack',
      description: 'Strong, absorbent 2-ply paper towels. Six rolls. Ideal for kitchen and cleaning. Quick-dry and durable.',
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400',
      category: categories[1]._id,
      price: 8.99,
      quantity: 75
    },
    {
      name: 'Laundry Detergent',
      description: 'Concentrated liquid detergent, 2L. Works in standard and HE machines. Fresh scent. Up to 64 loads.',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      category: categories[1]._id,
      price: 14.99,
      quantity: 60
    },
    {
      name: 'Trash Bags 50-Count',
      description: 'Heavy-duty drawstring trash bags. 50 count. Fits most 13-gallon bins. Tear-resistant.',
      image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=400',
      category: categories[1]._id,
      price: 11.99,
      quantity: 100
    },
    {
      name: 'Dish Soap Refill',
      description: 'Grease-cutting dish soap refill, 1L. Gentle on hands. Cuts through tough grease. Lemon scent.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      category: categories[1]._id,
      price: 4.99,
      quantity: 80
    },
    {
      name: 'Air Freshener Spray',
      description: 'Long-lasting lavender spray. 350ml. Neutralizes odors. Safe for fabrics and rooms. Pleasant, subtle scent.',
      image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',
      category: categories[1]._id,
      price: 5.49,
      quantity: 65
    },
    // Additional Electronics
    {
      name: 'Wireless Earbuds',
      description: 'Bluetooth 5.0 wireless earbuds. 20+ hour battery, charging case. Clear sound and comfortable fit. IPX4 sweat-resistant.',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a12f?w=400',
      category: categories[2]._id,
      price: 49.99,
      quantity: 100
    },
    {
      name: 'USB-C Hub 7-in-1',
      description: 'Adapter with HDMI, USB 3.0, SD slot, and power delivery. Compact design. Compatible with most laptops and tablets.',
      image: 'https://images.unsplash.com/photo-1625726414712-4c72226163b9?w=400',
      category: categories[2]._id,
      price: 39.99,
      quantity: 55
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard. Tactile switches. Ergonomic layout. Wired USB. For work and gaming.',
      image: 'https://images.unsplash.com/photo-1511467687858-23f96ee5c6c4?w=400',
      category: categories[2]._id,
      price: 89.99,
      quantity: 40
    },
    {
      name: 'Laptop Stand',
      description: 'Aluminum laptop stand. Adjustable height. Improves posture and cooling. Fits most laptops up to 17".',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91b3f2ac6?w=400',
      category: categories[2]._id,
      price: 34.99,
      quantity: 70
    },
    {
      name: 'LED Desk Lamp',
      description: 'Adjustable LED desk lamp. Multiple brightness levels. USB charging port. Modern, minimal design.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
      category: categories[2]._id,
      price: 29.99,
      quantity: 85
    },
    // Additional Books
    {
      name: 'Classic Cookbook',
      description: 'Hardcover cookbook with 200 tested recipes. From breakfast to dessert. Step-by-step instructions and photos.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      category: categories[3]._id,
      price: 19.99,
      quantity: 45
    },
    {
      name: 'Lined Journal',
      description: '192-page lined journal. Quality paper, lay-flat binding. Perfect for notes, diary, or planning. 5.5" x 8.5".',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      category: categories[3]._id,
      price: 12.99,
      quantity: 110
    },
    {
      name: 'Weekly Planner',
      description: '18-month weekly planner. Dated pages, goal sections, and notes. Stay organized at work or home.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400',
      category: categories[3]._id,
      price: 14.99,
      quantity: 60
    },
    {
      name: 'Bestselling Mystery Novel',
      description: 'Award-winning mystery novel. Page-turning plot and memorable characters. Paperback, 400+ pages.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      category: categories[3]._id,
      price: 13.99,
      quantity: 75
    },
    {
      name: 'A4 Sketchbook',
      description: '100 sheets of quality drawing paper. 120g weight. For pencil, pen, and light media. Lay-flat binding.',
      image: 'https://images.unsplash.com/photo-1589994965851-a8f479c57338?w=400',
      category: categories[3]._id,
      price: 9.99,
      quantity: 90
    },
    // Additional Toys
    {
      name: 'Jigsaw Puzzle 500pc',
      description: '500-piece jigsaw puzzle. Colorful, detailed image. Durable pieces. Great for family or solo time. Ages 8+.',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
      category: categories[4]._id,
      price: 14.99,
      quantity: 55
    },
    {
      name: 'Family Board Game',
      description: 'Award-winning board game for 2–6 players. Strategy and fun for all ages. 45–60 min play. Includes full instructions.',
      image: 'https://images.unsplash.com/photo-1611195974226-ef7c8f2b96c9?w=400',
      category: categories[4]._id,
      price: 24.99,
      quantity: 40
    },
    {
      name: 'Building Blocks 80pc',
      description: '80-piece building block set. Compatible with major brands. Storage bag included. Encourages creativity. Ages 4+.',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
      category: categories[4]._id,
      price: 19.99,
      quantity: 70
    },
    {
      name: 'Soft Plush Doll',
      description: 'Huggable plush doll. Machine washable. Safe for toddlers. Multiple characters available. 12" tall.',
      image: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf72?w=400',
      category: categories[4]._id,
      price: 12.99,
      quantity: 85
    },
    {
      name: 'Outdoor Kite',
      description: 'Easy-fly kite with long tail. Durable frame. Includes string and handle. Fun for parks and beaches. Ages 5+.',
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
      category: categories[4]._id,
      price: 11.99,
      quantity: 45
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
