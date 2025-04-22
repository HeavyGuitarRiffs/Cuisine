import React, { useState } from "react";
import { Badge } from "lucide-react";

const Profile = ({ stats, badges, badgeIcons }) => {
  const [showStats, setShowStats] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
      {/* Stats Dropdown */}
      <div className="mb-4">
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full text-left font-bold text-lg bg-gray-200 p-2 rounded"
        >
          {showStats ? "▼ Hide Stats" : "▶ Show Stats"}
        </button>
        {showStats && (
          <ul className="list-disc list-inside text-gray-700 mt-2 pl-4">
            {Object.entries(stats).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong> {value}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Badges Dropdown */}
      <div>
        <button
          onClick={() => setShowBadges(!showBadges)}
          className="w-full text-left font-bold text-lg bg-gray-200 p-2 rounded"
        >
          {showBadges ? "▼ Hide Badges" : "▶ Show Badges"}
        </button>
        {showBadges && (
          <div className="w-full max-w-2xl overflow-y-auto max-h-60 border border-gray-300 rounded-lg shadow-md mt-2">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left border-b">Badge</th>
                  <th className="p-2 text-left border-b">Icon</th>
                </tr>
              </thead>
              <tbody>
                {badges.map((badge) => (
                  <tr key={badge} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{badge}</td>
                    <td className="p-2 border-b flex items-center">
                      {badgeIcons?.[badge] || <Badge className="w-5 h-5 text-gray-400" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
