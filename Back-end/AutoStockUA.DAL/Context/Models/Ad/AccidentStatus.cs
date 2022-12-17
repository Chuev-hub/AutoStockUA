using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Ad
{
    [Serializable]
    public class AccidentStatus : IItem
    {
        [Key]
        public int Id { get; set; }
        [MemberNotNull]
                public string Name { get; set; }
        public List<Advertisement> Advertisements { get; set; }
    }
}
