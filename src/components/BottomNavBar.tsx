import { CircleDot, Home, Users, Sparkles, User, Star, Heart, TestTube2, X as XIcon } from 'lucide-react';

export type TabId = 'home' | 'friends' | 'void' | 'costar' | 'profile' | 'you2' | 'love' | 'x' | 'y' | 'test';

interface Tab {
  id: TabId;
  label: string;
  icon: typeof Home;
}

const TABS: Tab[] = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'friends', label: 'FRIENDS', icon: Users },
  { id: 'void', label: 'VOID', icon: Sparkles },
  { id: 'love', label: 'LOVE', icon: Heart },
  { id: 'costar', label: 'COSTAR', icon: Star },
  { id: 'profile', label: 'YOU', icon: User },
  { id: 'you2', label: 'YOU 2', icon: CircleDot },
  { id: 'x', label: 'X', icon: XIcon },
  { id: 'y', label: 'Y', icon: CircleDot },
  { id: 'test', label: 'TEST', icon: TestTube2 },
];

interface BottomNavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`bottom-nav__tab ${isActive ? 'bottom-nav__tab--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <Icon className="bottom-nav__icon" style={{ width: 16, height: 16 }} />
            <span className="bottom-nav__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
