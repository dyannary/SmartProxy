using MongoDB.Bson.Serialization.Attributes;

namespace ELearning.Domain.Entities
{
    public abstract class MongoDocument
    {
        [BsonId]
        public Guid Id { get; set; }
        public DateTime LastChangedTime { get; set; }
    }
}
