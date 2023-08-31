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
    public class JoinedCommunitiesController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public JoinedCommunitiesController(DacprojectContext context)
        {
            _context = context;
        }

        // GET: api/JoinedCommunities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JoinedCommunity>>> GetJoinedCommunities()
        {
          if (_context.JoinedCommunities == null)
          {
              return NotFound();
          }
            return await _context.JoinedCommunities.ToListAsync();
        }

        // GET: api/JoinedCommunities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JoinedCommunity>> GetJoinedCommunity(int id)
        {
          if (_context.JoinedCommunities == null)
          {
              return NotFound();
          }
            var joinedCommunity = await _context.JoinedCommunities.FindAsync(id);

            if (joinedCommunity == null)
            {
                return NotFound();
            }

            return joinedCommunity;
        }

        // PUT: api/JoinedCommunities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJoinedCommunity(int id, JoinedCommunity joinedCommunity)
        {
            if (id != joinedCommunity.JoinedCommunityId)
            {
                return BadRequest();
            }

            _context.Entry(joinedCommunity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JoinedCommunityExists(id))
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

        // POST: api/JoinedCommunities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JoinedCommunityDTO>> PostJoinedCommunity(JoinedCommunityDTO joinedCommunityDTO)
        {
          if (_context.JoinedCommunities == null)
          {
              return Problem("Entity set 'DacprojectContext.JoinedCommunities'  is null.");
          }
            _context.JoinedCommunities.Add(new JoinedCommunity());
            await _context.SaveChangesAsync();

            return joinedCommunityDTO;
        }

        // DELETE: api/JoinedCommunities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJoinedCommunity(int id)
        {
            if (_context.JoinedCommunities == null)
            {
                return NotFound();
            }
            var joinedCommunity = await _context.JoinedCommunities.FindAsync(id);
            if (joinedCommunity == null)
            {
                return NotFound();
            }

            _context.JoinedCommunities.Remove(joinedCommunity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JoinedCommunityExists(int id)
        {
            return (_context.JoinedCommunities?.Any(e => e.JoinedCommunityId == id)).GetValueOrDefault();
        }
    }
}
