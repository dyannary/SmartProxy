using ELearning.Domain.Entities;

namespace ELearning.Infrastructure.Repositories
{
    public interface ISourceRepository<T> where T : MongoDocument
    {
        T InsertRecord(T record);
        void UpsertRecord(T record);
        void DeleteRecord(Guid Id);
    }
}
