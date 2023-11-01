using ELearning.Domain.Entities;
using ELearning.Domain.Settings;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ELearning.Domain.Repositories
{
    public class MongoRepository<T> : IMongoRepository<T> where T : MongoDocument
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<T> _collection;

        public MongoRepository(IMongoDbSettings dbSettings)
        {
            _database = new MongoClient(dbSettings.ConnectionString).GetDatabase(dbSettings.DatabaseName);

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


        public void DeleteRecord(Guid id)
        {
            _collection.DeleteOne(doc => doc.Id == id);
        }

        public T InsertRecord(T record)
        {
            _collection.InsertOne(record);

            return record;
        }

        public void UpsertRecord(T record)
        {
            _collection.ReplaceOne(doc => doc.Id == record.Id, record,
                new ReplaceOptions()
                {
                    IsUpsert = true
                });
        }
    }
}
