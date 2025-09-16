using api.Controllers;
using services.DTOs.Request;

namespace services.Abstractions;

/// <summary>
/// Book service abstraction (should be deleted)
/// </summary>
/// <typeparam name="TRes">The respone the service should give</typeparam>
[Obsolete]
public interface IBookService<TRes, TCreate, TUpdate>
{
    public List<TRes> GetBooks();
    public TRes GetBook(string id);
    public TRes CreateBook(CreateBookDto dto);
    public TRes UpdateBook(UpdateBookDto dto);
    public TRes DeleteBook(string id);
}