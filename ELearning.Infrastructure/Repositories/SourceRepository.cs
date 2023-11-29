using ELearning.Domain.Entities;
using ELearning.Infrastructure.Settings;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ELearning.Infrastructure.Repositories
{
    public class SourceRepository<T> : ISourceRepository<T> where T : MongoDocument
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<T> _collection;

        public SourceRepository(IMongoDbSettings dbSettings)
        {
            _database = new MongoClient(dbSettings.ConnectionString).GetDatabase(dbSettings.DatabaseName);

            string tableName = typeof(T).Name.ToLower();

            _collection = _database.GetCollection<T>(tableName);
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
