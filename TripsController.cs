using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dacproject.Data;
using Dacproject.Models;
using WebApplicationMySql.DTO;

namespace GlobeTrotters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public TripsController(DacprojectContext context)
        {
            _context = context;
        }

        // GET: api/Trips
        [HttpGet("getIndividualTrip/{userId}")]
        public async Task<ActionResult<IEnumerable<int>>> GetTrips(int userId)
        {
            if (_context.Trips == null)
            {
                return NotFound();
            }
            else
            {
                var trips = await (from t in _context.Trips
                            where t.UserId == userId
                            select t.TripId).ToListAsync();

                if (trips.Count == 0)
                    return NotFound("no trips added!!!");
                else
                    return Ok(trips);
            }
        }


        // GET: api/Trips/5
        [HttpGet("{tripId}")]
        public async Task<ActionResult<Trip>> GetTrip(int tripId)
        {
            if (_context.Trips == null)
            {
                return NotFound();
            }
            var trip = await _context.Trips.FindAsync(tripId);

            if (trip == null)
            {
                return NotFound();
            }

            return trip;
        }

        // PUT: api/Trips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrip(int id, Trip trip)
        {
            if (id != trip.TripId)
            {
                return BadRequest();
            }

            _context.Entry(trip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        // POST: api/Trips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Trip>> PostTrip(TripDTO tripDTO)
        {
            Trip trip = new Trip();
            trip.UserId = tripDTO.UserId;
            trip.Itinerary = tripDTO.Itinerary;
            trip.LocationName = tripDTO.LocationName;
            trip.InterestedCount = 0;
            trip.Latitude = 0;
            trip.Longitude = 0;
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            return Ok("trip added successfully");
        }

        // DELETE: api/Trips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            if (_context.Trips == null)
            {
                return NotFound();
            }
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null)
            {
                return NotFound();
            }

            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();

            return Ok("trip removed successfully!!!");
        }

        [HttpPut("intrested_in_trip/{tripId}")]
        public async Task<ActionResult<Trip>> IntrestedInTrip(int tripId)
        {
            var trip = _context.Trips.FirstOrDefault(x => x.TripId == tripId);
            if (trip == null)
                return NotFound();
            else
            {
                trip.InterestedCount++;
             await  _context.SaveChangesAsync();
                return Ok(trip);
            };
        }

        [HttpGet("all_trip_info/{userId}")]
        public ActionResult GetTripInfoByUserId(int userId)
        {
            if (_context.Trips == null)
            {
                return NotFound();
            }

            var tripInfo = from trip in _context.Trips
                           where trip.UserId == userId
                           join user in _context.Users on trip.UserId equals user.UserId
                           select new { user.UserName, trip.LocationName, trip.Itinerary, trip.InterestedCount };

            // Return the results as a list.
            return Ok(tripInfo.FirstOrDefault());
        }


        //[HttpGet("user_I_Folllow_trip_info/{userId}")]
        //public async Task<IActionResult> GetTripInfoOfUserIFollow(int userId)
        //{
        //    if (_context.Trips == null)
        //    {
        //        return NotFound();
        //    }
        //    var following = await _context.Connections
        //        .Where(c => c.FollowingTo == userId)
        //        .Select(c => c.FollowedByNavigation.UserId)
        //        .ToListAsync();

        //   // var tripInfo = List<>;
        //    foreach(var followingUserId in following)
        //    {
        //        var tripInfo = from trip in _context.Trips
        //                       where trip.UserId == followingUserId
        //                       join user in _context.Users on trip.UserId equals user.UserId
        //                       select new { user.UserName, trip.LocationName, trip.Itinerary, trip.InterestedCount };
        //    }

        //    // Return the results as a list.
        //    return Ok(tripInfo.ToList());
        //}


        private bool TripExists(int id)
        {
            return (_context.Trips?.Any(e => e.TripId == id)).GetValueOrDefault();
        }
    }
}

 