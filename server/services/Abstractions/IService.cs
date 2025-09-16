namespace services.Abstractions;

// Rename ? -> reposity designpattern?
/// <summary>
/// Repository abstraction
/// </summary>
/// <typeparam name="TRes">Response type</typeparam>
/// <typeparam name="TCreate">Create type</typeparam>
/// <typeparam name="TUpdate">Update type</typeparam>
public interface IService<TRes, TCreate, TUpdate>
{
    public List<TRes> Get();
    public TRes Get(string id);

    public TRes Create(TCreate request);
    public TRes Update(TUpdate request);
    public TRes Delete(string id);
}