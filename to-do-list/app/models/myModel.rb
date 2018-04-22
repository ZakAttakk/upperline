
def readList
    listArray = []
    File.open("app/models/listData.txt").each do |line|
        listArray.push(line)
    end
    
    listArray.each do |item|
        item.chomp!
    end
    
    # listArray.map! { |item| item + "<br>" }

    return listArray
end

def writeList(item)
    File.open("app/models/listData.txt", "a") do |line|
        line.puts(item + "\n")
    end
end