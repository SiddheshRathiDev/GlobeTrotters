using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Admin
{
    public int? AdminId { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User? AdminNavigation { get; set; }
}
