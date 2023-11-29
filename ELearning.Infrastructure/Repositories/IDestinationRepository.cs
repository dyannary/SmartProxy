using ELearning.Domain.Entities;

namespace ELearning.Infrastructure.Repositories
{
    public interface IDestinationRepository<T> where T: MongoDocument
    {
        List<T> GetAllRecords();
        //T InsertRecord(T record);
        T GetRecordById(Guid Id);
        //void UpsertRecord(T record);
        //void DeleteRecord(Guid Id);
    } 
}
