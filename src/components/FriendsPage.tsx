import { ArrowLeft, UserPlus, Users } from 'lucide-react';

interface FriendsPageProps {
  onBack: () => void;
}

export default function FriendsPage({ onBack }: FriendsPageProps) {
  return (
    <div className="friends-page">
      <header className="friends-page__header">
        <button className="friends-page__back" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="friends-page__title">Mes Amis</h1>
      </header>

      <div className="friends-page__empty">
        <div className="friends-page__empty-icon">
          <Users className="w-12 h-12" />
        </div>
        <h2 className="friends-page__empty-title">Aucun ami ajouté</h2>
        <p className="friends-page__empty-text">
          Ajoutez des amis pour comparer vos thèmes astraux et découvrir votre compatibilité.
        </p>
        <button className="friends-page__add-btn">
          <UserPlus className="w-5 h-5" />
          Ajouter un ami
        </button>
      </div>
    </div>
  );
}
