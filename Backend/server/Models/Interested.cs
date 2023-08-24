using System;
using System.Collections.Generic;
using WebApplicationMySql.DTO;

namespace Dacproject.Models;

public partial class Interested
{
    private Interested() { }
    public Interested(InterestedDTO interestedDTO) 
    {
        this.UserId = interestedDTO.UserId;
        this.TripId = interestedDTO.TripId;

    }
    public int InterestedId { get; set; }

    public int? UserId { get; set; }

    public int? TripId { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Trip? Trip { get; set; }

    public virtual User? User { get; set; }
}
