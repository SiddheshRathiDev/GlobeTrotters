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
        public async Task<ActionResult<IEnumerable<Trip>>> GetTrips(int userId)
        {
          if (_context.Trips == null)
          {
              return NotFound();
          }else
            {
                var trips = (from t in _context.Trips
                             where t.UserId == userId
                             select t.TripId).ToList();

                return Ok(trips);
            }
            return await _context.Trips.ToListAsync();
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
          if (_context.Trips == null)
          {
              return Problem("Entity set 'DacprojectContext.Trips'  is null.");
          }
            Trip trip = new Trip();
            trip.UserId = tripDTO.UserId;
            trip.Itinerary = tripDTO.Itinerary;
            trip.LocationName = tripDTO.LocationName;
            trip.InterestedCount = 0;
            trip.Latitude = 0;
            trip.Longitude = 0;
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            return Ok("operation successful");
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

            return NoContent();
        }

        private bool TripExists(int id)
        {
            return (_context.Trips?.Any(e => e.TripId == id)).GetValueOrDefault();
        }
    }
}
