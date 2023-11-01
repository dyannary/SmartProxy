namespace ELearning.Domain.Entities
{
    public class Course : MongoDocument
    {
        public string Title { get; set; }

        public List<Category> Categories { get; set; }

        public string Description { get; set; }

        public string Author { get; set; } 
    }
}
