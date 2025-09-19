using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record UpdateBookDto
{
    [MinLength(2)][Required]public string Id { get; set; } = null!;
}