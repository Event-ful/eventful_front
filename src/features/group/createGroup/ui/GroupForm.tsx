import { Textarea } from '@/shared/ui/textarea';
import CameraIcon from '@/assets/svg/camera.svg';
import X from '@/assets/svg/X.svg';
import { Button1, Headline2, Title1 } from '@/shared/ui/typography';
import { Input } from '@/shared/ui/input';
import GroupCard from '@/widgets/group/groupCard';
import { useGroupForm } from '../model/useGroupForm';

export const GroupForm = () => {
  const {
    name,
    description,
    imagePreview,
    fileInputRef,
    isFormValid,
    isSubmitting,
    setName,
    setDescription,
    handleImageUpload,
    handleImageAreaClick,
    handleImageRemove,
    submitGroup,
  } = useGroupForm();

  return (
    <div className="bg-white-100 w-full h-full p-[24px]">
      <div className="bg-white-50 w-full h-full rounded-[8px] p-[24px] flex gap-5">
        <div className="w-full flex flex-col justify-between h-full">
          <div>
            <Headline2 className="mb-[22px]">그룹 만들기</Headline2>
            <div className="flex flex-col gap-5">
              <div>
                <div className="y-center gap-1">
                  <Title1 className="mb-2">그룹 이름</Title1>
                  <span className="text-red-200">*</span>
                </div>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="그룹명을 입력하세요."
                  maxLength={15}
                />
              </div>
              <div>
                <div className="y-center gap-1">
                  <Title1 className="mb-2">그룹 소개</Title1>
                  <span className="text-red-200">*</span>
                </div>
                <Textarea
                  value={description}
                  onChange={setDescription}
                  height="100px"
                  placeholder="그룹을 소개해주세요."
                  maxLength={200}
                />
              </div>
              <div>
                <Title1 className="mb-2">그룹 사진</Title1>
                <div className="relative">
                  <div
                    onClick={handleImageAreaClick}
                    className="w-[350px] h-[200px] border-2 border-dashed border-gray-300 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="그룹 사진 미리보기"
                          className="w-full h-full object-cover rounded-[6px]"
                        />
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleImageRemove();
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
                        >
                          <img src={X} alt="cancel" className="w-[15px] h-[15px]" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <img src={CameraIcon} className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-center">
                          그룹을 대표하는 사진을 업로드하세요
                          <br />
                          최대 10mb 까지 지원됩니다.
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={submitGroup}
              disabled={!isFormValid || isSubmitting}
              className={`px-[80px] py-[12px] rounded-md 
                ${isFormValid && !isSubmitting ? 'bg-green-400 text-white-100 hover:bg-green-500' : 'bg-black-200 text-black-300 cursor-not-allowed'}`}
            >
              <Button1>{isSubmitting ? '처리 중...' : '그룹 만들기'}</Button1>
            </button>
          </div>
        </div>

        <div className="w-[2px] h-full bg-black-200"></div>
        <div className="flex flex-col w-[300px]">
          <Title1 className="mb-4">미리보기</Title1>
          <GroupCard
            title={name || '그룹명을 입력하세요'}
            description={description || '그룹을 소개해주세요'}
            member={0}
            img={imagePreview}
          />
        </div>
      </div>
    </div>
  );
};
