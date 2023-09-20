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

namespace WebApplicationMySql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterestedsController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public InterestedsController(DacprojectContext context)
        {
            _context = context;
        }

        // GET: api/Interesteds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Interested>>> GetInteresteds()
        {
          if (_context.Interesteds == null)
          {
              return NotFound();
          }
            return await _context.Interesteds.ToListAsync();
        }

        // GET: api/Interesteds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Interested>> GetInterested(int id)
        {
          if (_context.Interesteds == null)
          {
              return NotFound();
          }
            var interested = await _context.Interesteds.FindAsync(id);

            if (interested == null)
            {
                return NotFound();
            }

            return interested;
        }

        // PUT: api/Interesteds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInterested(int id, Interested interested)
        {
            if (id != interested.InterestedId)
            {
                return BadRequest();
            }

            _context.Entry(interested).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterestedExists(id))
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

        // POST: api/Interesteds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InterestedDTO>> PostInterested(InterestedDTO interestedDTO)
        {
          if (_context.Interesteds == null)
          {
              return Problem("Entity set 'DacprojectContext.Interesteds'  is null.");
          }
            _context.Interesteds.Add(new Interested(interestedDTO));
            await _context.SaveChangesAsync();

            return interestedDTO;
        }

        // DELETE: api/Interesteds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterested(int id)
        {
            if (_context.Interesteds == null)
            {
                return NotFound();
            }
            var interested = await _context.Interesteds.FindAsync(id);
            if (interested == null)
            {
                return NotFound();
            }

            _context.Interesteds.Remove(interested);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InterestedExists(int id)
        {
            return (_context.Interesteds?.Any(e => e.InterestedId == id)).GetValueOrDefault();
        }
    }
}
