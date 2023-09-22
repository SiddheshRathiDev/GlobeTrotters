using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Interested
{
    public int InterestedId { get; set; }

    public int? UserId { get; set; }

    public int? TripId { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Trip? Trip { get; set; }

    public virtual User? User { get; set; }
}
