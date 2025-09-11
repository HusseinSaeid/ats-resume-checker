import Navbar from "@/components/Navebar";
import UploadComponent from "@/components/UploadComponent";

export default function Upload() {
  return (
    <main className="bg-gradient bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>One step closer to your dream job</h1>
          <UploadComponent />
        </div>
      </section>
    </main>
  );
}
