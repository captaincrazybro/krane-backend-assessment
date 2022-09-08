import LoginStatus from "./LoginStatus";
import "./styles.css";

export default function Layout(props: any) {
  return (
    <div className="App min-h-screen">
      <header className="App-header bg-black">
        <h1 className="px-5"><a className="Link" href="/">Krane Assessment</a></h1>
        <slot className="flex Login-status"><LoginStatus /></slot>
      </header>
      <section className="App-body flex items-center justify-center">
        {props.children}
      </section>
    </div>
  )
}