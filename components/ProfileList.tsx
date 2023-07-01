import { isEmpty } from "lodash";
import ProfileListItem from "./ProfileListItem";

interface ProfileListProps {
  data: Record<string, any>[];
  title: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main>
      <h1>{title}</h1>
      <div>
        {data.map((movie) => {
          return <ProfileListItem key={movie.id} movieId={movie.id} />;
        })}
      </div>
    </main>
  );
};
export default ProfileList;
