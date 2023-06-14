import Link from "next/link";

export default function Landing() {
  //De momento lo hice con link directo al home, despues lo cambiare

  return (
    <div>
      <h1>ReStore</h1>
      <button><Link href='/home'>Iniciar Sesion</Link></button>
      <button><Link href='/home'>Registrarse</Link></button>
      <Link href='/home'>Ingresar sin cuenta</Link>
    </div>
  );
}
