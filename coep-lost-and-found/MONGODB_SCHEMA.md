# MongoDB Schema Documentation

## Database: `coep-lost-found`

### Collection: `foundItems`

**Description**: Stores items that have been found and reported

**Document Structure**:
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  title: String,           // Required: Title of the found item
  description: String,     // Required: Description of the item
  category: String,        // Required: Category (e.g., Electronics, Books, etc.)
  location: String,        // Required: Where the item was found
  contact: String,         // Required: Contact information for the finder
  imageUrl: String | null, // Optional: URL to item image
  createdAt: Date          // Auto-generated: When the item was reported
}
```

**Indexes**:
- `{ createdAt: -1 }` - For sorting by newest items first

### Collection: `lostItems`

**Description**: Stores items that have been lost and reported

**Document Structure**:
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  title: String,           // Required: Title of the lost item
  description: String,     // Required: Description of the item
  category: String,        // Required: Category (e.g., Electronics, Books, etc.)
  location: String,        // Required: Where the item was lost
  contact: String,         // Required: Contact information for the owner
  imageUrl: String | null, // Optional: URL to item image
  createdAt: Date          // Auto-generated: When the item was reported
}
```

**Indexes**:
- `{ createdAt: -1 }` - For sorting by newest items first

## API Endpoints

### Found Items
- `GET /api/found-items` - Retrieve all found items (sorted by newest first)
- `POST /api/found-items` - Create a new found item

### Lost Items
- `GET /api/lost-items` - Retrieve all lost items (sorted by newest first)
- `POST /api/lost-items` - Create a new lost item

## Validation Notes

Both collections require the following fields:
- `title` (string, required)
- `description` (string, required)
- `category` (string, required)
- `location` (string, required)
- `contact` (string, required)

Optional fields:
- `imageUrl` (string, can be null)

Auto-generated fields:
- `_id` (ObjectId)
- `createdAt` (Date)

## Current Status

✅ **foundItems** collection exists and is working correctly
✅ **lostItems** collection exists (empty but ready for use)
✅ MongoDB connection is established and functional
