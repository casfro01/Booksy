using System.ComponentModel.DataAnnotations;
using dataaccess;
using Microsoft.EntityFrameworkCore;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace services;

public class GenreService(MyDbContext db) : IService<BaseGenreResponse, CreateGenreDto, UpdateGenreDto>
{
    public Task<List<BaseGenreResponse>> Get()
    {
        return db.Genres.Select(g => new BaseGenreResponse(g)).ToListAsync();
    }
    
    public Task<BaseGenreResponse> Get(string id)
    {
        throw new NotImplementedException();
    }

    public async Task<BaseGenreResponse> Create(CreateGenreDto dto)
    {
        // validate the dto
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        // generate data
        var id = Guid.NewGuid().ToString();
        var time = DateTime.UtcNow;
        
        // create genre
        var genre = new Genre
        {
            Id = id,
            Name = dto.Name,
            Createdat = time
        };
        
        // perform db actions
        db.Genres.Add(genre); 
        await db.SaveChangesAsync();
        return new BaseGenreResponse(genre);
    }

    public async Task<BaseGenreResponse> Update(UpdateGenreDto dto)
    {
        // Validate dto
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        // find book
        var currentGenre = db.Genres.First(g => g.Id == dto.Id);
        
        // update base information
        currentGenre.Name = dto.Name;
        
        await db.SaveChangesAsync();
        return new BaseGenreResponse(currentGenre);
    }

    public async Task<BaseGenreResponse> Delete(string id)
    {
        var genre = db.Genres.First(g => g.Id == id);
        db.Genres.Remove(genre);

        await db.SaveChangesAsync();

        return new BaseGenreResponse(genre);
    }
}