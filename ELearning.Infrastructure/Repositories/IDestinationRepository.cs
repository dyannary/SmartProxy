using ELearning.Domain.Entities;

namespace ELearning.Infrastructure.Repositories
{
    public interface IDestinationRepository<T> where T: MongoDocument
    {
        List<T> GetAllRecords();
        T GetRecordById(Guid Id);
    } 
}
