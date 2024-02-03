﻿using System.ComponentModel.DataAnnotations;

namespace WebApplicationMySql.DTO
{
    public class TripDTO
    {
        [Required]
        public int UserId { get; set; }

        public string? Itinerary { get; set; }

        public string? LocationName { get; set; }

    }
}