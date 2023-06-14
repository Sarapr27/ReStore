export function SearchBar () {
  

  return(
    <div>
      <form>
        <input
          type="text"
          placeholder="Buscar producto"
          /* onChange={handleChange} */
          name="search"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}