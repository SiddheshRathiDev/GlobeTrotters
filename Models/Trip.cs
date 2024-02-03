using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Trip
{
    public int TripId { get; set; }

    public int? UserId { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public string? LocationName { get; set; }

    public string? Itinerary { get; set; }

    public int? InterestedCount { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual ICollection<Interested> Interesteds { get; set; } = new List<Interested>();

    public virtual User? User { get; set; }
}
