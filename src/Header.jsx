
import { Calendar } from "lucide-react";
function Header(pops){
    return(
        <header className="header">
            <div className="header-text">
                <h1>Stay Focused</h1>
                <p className="date-display">
                    <Calendar size = {16}/>
                   {new Date().toLocaleDateString('en-Us',{weekday: 'long', month: 'long', day: 'numeric'})}
                </p>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <span className="stat-value pending">{pops.stat.pending}</span>
                    <span className="stat-label">Pending</span>
                </div>
                 <div className="stat-card">
                    <span className="stat-value completed">{pops.stat.completed}</span>
                    <span className="stat-label"> completed</span>
                </div>
            </div>
        </header>
    );
}
export default Header;