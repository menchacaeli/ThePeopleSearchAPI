namespace PeopleSearchApi.Models
{
    public class User
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string Interest { get; set; }
        public string ImagePath { get; set; }
    }
}