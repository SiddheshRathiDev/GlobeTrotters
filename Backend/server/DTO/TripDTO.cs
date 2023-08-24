namespace WebApplicationMySql.DTO
{
    public class TripDTO
    {
        public int TripId { get; set; }

        public int? UserId { get; set; }

        public string? Itinerary { get; set; }

        public int? InterestedCount { get; set; }

    }
}
