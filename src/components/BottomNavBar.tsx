import { Home, Users, Sparkles, ShoppingBag, User, Star, Heart } from 'lucide-react';

export type TabId = 'home' | 'friends' | 'void' | 'chart' | 'costar' | 'profile' | 'love';

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
  { id: 'chart', label: 'SHOP', icon: ShoppingBag },
  { id: 'profile', label: 'YOU', icon: User },
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
        const isVoid = tab.id === 'void';
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`bottom-nav__tab ${isActive ? 'bottom-nav__tab--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <Icon
              className="bottom-nav__icon"
              style={{ width: isVoid ? 22 : 18, height: isVoid ? 22 : 18 }}
            />
            <span className="bottom-nav__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
