export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',// array of images
        // of property
        of: [{ type: 'image' }],
        options: {
          hotspot: true, // is a property on the image, help position the image 
        }
      },
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      { 
        // slug (url unique string)
        name: 'slug',
        title: 'Slug',
        type: 'slug', // sanity type for unique identifiers 
        options: {
          source: 'name', // automaticlly generate unique slug for the 'name' property
          maxLength: 90, // chars
        }
      },
      { 
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      }
    ]
  }