import struct

# Encode an integer
integer = 4212
packed_integer = struct.pack("i", integer)

# Print the encoded integer
print(packed_integer)
