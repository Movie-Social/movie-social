import { isEmpty } from "lodash";
import ProfileListItem from "./ProfileListItem";
interface ProfileListProps {
  data: Record<string, any>[];
}

const ProfileList: React.FC<ProfileListProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main>
      <div className="grid grid-cols-3 gap-2 p-2 my-3 border-yellow-300 border">
        {data.map((movie) => {
          return <ProfileListItem key={movie.id} movieId={movie.id} />;
        })}
      </div>
    </main>
  );
};
export default ProfileList;
