namespace ELearning.Infrastructure.Settings
{
    public interface IDestDbSettings
    {
        string DestDatabaseName { get; set; }
        string DestConnectionString { get; set; }
    }
}
