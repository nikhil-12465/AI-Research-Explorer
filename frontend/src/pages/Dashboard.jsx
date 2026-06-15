import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import RecentActivity from "../components/RecentActivity";
import RecentDocuments from "../components/RecentDocuments";

function Dashboard() {

    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div
    style={{
        flex: 1,
        background: "#f8fafc",
        minHeight: "100vh"
    }}
>

                <Navbar />

                <div
                    style={{
                        padding: "20px"
                    }}
                >

                    <h1
                        style={{
                            color: "#0f172a"
                        }}
                    >
                        Welcome Back 👋
                    </h1>

                    <p
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Manage research papers, generate summaries,
                        compare papers and explore research topics.
                    </p>

                    <DashboardCards />

                    <RecentDocuments />

                    <RecentActivity />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;