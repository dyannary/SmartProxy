using ELearning.Domain.Entities;
using ELearning.Infrastructure.Settings;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ELearning.Infrastructure.Repositories
{
    public class DestinationRepository<T> : IDestinationRepository<T> where T : MongoDocument
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<T> _collection;

        public DestinationRepository(IDestDbSettings dbSettings)
        {
            _database = new MongoClient(dbSettings.DestConnectionString).GetDatabase(dbSettings.DestDatabaseName);

            string tableName = typeof(T).Name.ToLower();

            _collection = _database.GetCollection<T>(tableName);
        }

        public List<T> GetAllRecords()
        {
            var records = _collection.Find(new BsonDocument()).ToList();

            return records;
        }

        public T GetRecordById(Guid id)
        {
            var record = _collection.Find(doc => doc.Id == id).FirstOrDefault();

            return record;
        }
    }
}
