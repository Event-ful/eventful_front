import { useState, useEffect, useRef } from 'react';

export interface LocationData {
  placeName: string;
  placeId: string;
  latitude: number;
  longitude: number;
  address: string;
  roadAddress: string;
}

interface LocationSearchProps {
  value: string;
  onChange: (locationData: LocationData) => void;
  placeholder?: string;
  className?: string;
}

interface KakaoPlace {
  place_name: string;
  id: string;
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
  address_name: string;
  road_address_name: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export const LocationSearch = ({
  value,
  onChange,
  placeholder = '장소를 입력하세요',
  className = '',
}: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<KakaoPlace[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<any>(null);

  // 카카오맵 SDK 로딩 확인
  useEffect(() => {
    const checkKakaoLoaded = () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        setIsKakaoLoaded(true);
      } else {
        setTimeout(checkKakaoLoaded, 100);
      }
    };

    checkKakaoLoaded();
  }, []);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchPlaces = (keyword: string) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    if (!isKakaoLoaded || !window.kakao) {
      setSuggestions([]);
      return;
    }

    try {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data: KakaoPlace[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSuggestions(data.slice(0, 5));
          setIsOpen(true);
        } else {
          setSuggestions([]);
        }
      });
    } catch (error) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchPlaces(newValue);
    }, 300);
  };

  const handleSelect = (place: KakaoPlace) => {
    const locationData: LocationData = {
      placeName: place.place_name,
      placeId: place.id,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
      address: place.address_name,
      roadAddress: place.road_address_name || place.address_name,
    };

    setSearchTerm(place.place_name);
    onChange(locationData);
    setSuggestions([]);
    setIsOpen(false);
  };

  const isTyping = searchTerm.trim().length > 0;

  const getBorderColor = () => {
    if (isFocused || isTyping) return 'border-black-300';
    return 'border-black-200';
  };

  const getTextColor = () => {
    if (isTyping) return 'text-black-500';
    return 'text-black-300';
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => {
          setIsFocused(true);
          if (searchTerm.trim()) {
            searchPlaces(searchTerm);
          }
        }}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused || isTyping ? '' : placeholder}
        className={`w-full resize-none block rounded-[6px] py-[10px] pl-2 pr-[25px]
          bg-white-50 border-[1px] transition-colors
          font-regular text-[14px] leading-[14px]
          focus:outline-none
          ${getBorderColor()}
          ${getTextColor()}
          placeholder:text-black-300 placeholder:font-regular placeholder:text-[14px]
          ${isFocused ? 'caret-black-400' : ''}`}
      />

      {isOpen && suggestions.length > 0 && (
        <div className="absolute bg-white-50 top-full left-0 right-0 mt-1 bg-white rounded-[6px] shadow-lg border border-black-200 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <div
              key={index}
              onMouseDown={e => {
                e.preventDefault();
                handleSelect(place);
              }}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-black-100 last:border-b-0"
            >
              <div className="font-medium text-[14px] text-black-500">{place.place_name}</div>
              <div className="text-[12px] text-black-300 mt-1">
                {place.road_address_name || place.address_name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
