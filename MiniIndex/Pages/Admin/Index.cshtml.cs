﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MiniIndex.Models;

namespace MiniIndex.Pages.Admin
{
    [Authorize]
    public class AdminModel : PageModel
    {
        private readonly MiniIndex.Models.MiniIndexContext _context;
        public IList<Mini> Mini { get; set; }

        public AdminModel(MiniIndex.Models.MiniIndexContext context)
        {
            _context = context;
        }

        public async Task OnGetAsync()
        {
            Mini = await _context.Mini
                        .Include(m => m.MiniTags)
                            .ThenInclude(mt => mt.Tag)
                        .Include(m => m.Creator)
                        .Where(m => m.Status == Status.Pending)
                        .AsNoTracking()
                        .ToListAsync();
        }
    }
}
