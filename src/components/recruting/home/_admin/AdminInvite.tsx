import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAdminInviteByClub, postAdminInviteAccept } from "./service/Admin";
import AcceptAdminModal from "./AcceptAdminModal";
import { getMe } from "../../../signup/services/User";

function AdminInvite() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");
  const [clubId, setClubId] = useState(0);

  const [openAdminInviteModal, setOpenAdminInviteModal] = useState(true);
  const handleAddAdminCloseModal = () => {
    setOpenAdminInviteModal(false);
  };

  //유저 정보 조회
  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });

  //초대 링크로 동아리 정보 조회
  const { data: clubInfo } = useQuery(
    ["adminInvite", token],
    () => getAdminInviteByClub(token!),
    {
      enabled: !!token,
      retry: false,
      onSuccess: (data) => {
        console.log("초대 링크로 받은 동아리 정보:", data);
      },
      onError: (error) => {
        console.error("초대 처리 중 오류 발생:", error);
      }
    }
  );

  // 초대 링크 수락
  const acceptInviteMutation = useMutation(
    (clubId: number) =>
      postAdminInviteAccept(token!, user?.email, Number(clubId)),
    {
      onSuccess: (data) => {
        console.log("운영진 초대 수락 성공:", data);
        navigate(`/recruting/home/${clubId}`);
      },
      onError: (error) => {
        console.error("운영진 초대 수락 실패:", error);
      }
    }
  );

  const handleAcceptInviteAdmin = () => {
    if (clubInfo && clubInfo.id) {
      acceptInviteMutation.mutate(clubInfo.id);
    } else {
      console.error("동아리 정보가 없습니다.");
    }
  };

  //토큰 없을 시 메인 화면으로
  useEffect(() => {
    if (!token) {
      navigate("/main");
    }
  }, [token, navigate]);

  return (
    <div>
      {openAdminInviteModal && (
        <AcceptAdminModal
          onClose={handleAddAdminCloseModal}
          onAccept={handleAcceptInviteAdmin}
          club={clubInfo}
        />
      )}
    </div>
  );
}

export default AdminInvite;
